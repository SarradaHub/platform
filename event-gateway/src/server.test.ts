import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { KafkaProducer } from "./kafka";
import { SchemaRegistry } from "./schema-registry";
import { buildServer } from "./server";

describe("event ingestion", () => {
  const publish = vi.fn().mockResolvedValue(undefined);
  const validator = vi.fn().mockReturnValue(true);

  const producer: Pick<KafkaProducer, "publish"> = {
    publish,
  } as KafkaProducer;

  const registry: Pick<SchemaRegistry, "getValidator"> = {
    getValidator: vi.fn().mockResolvedValue(validator),
  } as unknown as SchemaRegistry;

  let app: ReturnType<typeof buildServer>;

  beforeEach(() => {
    publish.mockClear();
    (registry.getValidator as unknown as ReturnType<typeof vi.fn>).mockClear();
    validator.mockClear();
    app = buildServer({ producer: producer as KafkaProducer, registry: registry as SchemaRegistry });
  });

  it("accepts valid events", async () => {
    const payload = { eventId: "123", schemaVersion: "v1", occurredAt: new Date().toISOString(), source: "test", payload: {} };

    const response = await request(app).post("/events/test-topic").send(payload);

    expect(response.status).toBe(202);
    expect(publish).toHaveBeenCalledWith("test-topic", payload);
  });

  it("rejects invalid events", async () => {
    validator.mockReturnValueOnce(false);

    const response = await request(app).post("/events/test-topic").send({});

    expect(response.status).toBe(422);
    expect(publish).not.toHaveBeenCalled();
  });
});
