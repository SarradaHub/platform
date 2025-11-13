import { Kafka, KafkaConfig, Producer, Consumer } from "kafkajs";

import { appConfig } from "./config";
import { logger } from "./logger";

export function buildKafkaClient(): Kafka {
  const config: KafkaConfig = {
    clientId: appConfig.kafkaClientId,
    brokers: appConfig.kafkaBrokers,
    ssl: appConfig.kafkaSsl,
  };

  if (appConfig.kafkaSasl) {
    config.sasl = appConfig.kafkaSasl;
  }

  return new Kafka(config);
}

export class KafkaProducer {
  private readonly kafka: Kafka;
  private producer?: Producer;

  constructor() {
    this.kafka = buildKafkaClient();
  }

  async connect(): Promise<void> {
    if (!this.producer) {
      this.producer = this.kafka.producer({ allowAutoTopicCreation: false });
    }

    await this.producer.connect();
    logger.info("Kafka producer connected");
  }

  async disconnect(): Promise<void> {
    if (this.producer) {
      await this.producer.disconnect();
      logger.info("Kafka producer disconnected");
    }
  }

  async publish(topic: string, value: Record<string, unknown>): Promise<void> {
    if (!this.producer) {
      throw new Error("Producer not connected");
    }

    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(value) }],
    });
  }
}

export async function createKafkaConsumer(groupId: string): Promise<Consumer> {
  const kafka = buildKafkaClient();
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  return consumer;
}
