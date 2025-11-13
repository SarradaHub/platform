import { GetSchemaVersionCommand, GlueClient } from "@aws-sdk/client-glue";
import Ajv, { ValidateFunction } from "ajv";
import addFormats from "ajv-formats";

import { appConfig } from "./config";
import { logger } from "./logger";

type SchemaKey = string;

type CachedSchema = {
  validator: ValidateFunction;
  expiresAt: number;
};

export class SchemaRegistry {
  private readonly glue = new GlueClient({ region: appConfig.awsRegion });
  private readonly ajv: Ajv;
  private readonly cache = new Map<SchemaKey, CachedSchema>();

  constructor() {
    this.ajv = new Ajv({
      strict: true,
      allErrors: true,
    });
    addFormats(this.ajv);
  }

  async getValidator(subject: string): Promise<ValidateFunction> {
    const cached = this.cache.get(subject);

    if (cached && cached.expiresAt > Date.now()) {
      return cached.validator;
    }

    logger.info({ subject }, "Loading schema from Glue registry");

    const response = await this.glue.send(
      new GetSchemaVersionCommand({
        SchemaId: {
          RegistryName: appConfig.glueRegistryName,
          SchemaName: subject,
        },
        SchemaVersionNumber: {
          LatestVersion: true,
        },
      }),
    );

    if (!response.SchemaDefinition) {
      throw new Error(`Schema definition missing for ${subject}`);
    }

    const schemaJson = JSON.parse(response.SchemaDefinition);
    const validator = this.ajv.compile(schemaJson);

    this.cache.set(subject, {
      validator,
      expiresAt: Date.now() + appConfig.schemaCacheTtlMs,
    });

    return validator;
  }
}
