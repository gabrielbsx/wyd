import { Redis } from "ioredis";

export interface IQueue {
  subscriber(
    channel: string,
    callback: (request: unknown) => Promise<void>
  ): Promise<void>;
  publish(channel: string, request: unknown): Promise<void>;
  listen(): void;
  close(): void;
}

export class Queue implements IQueue {
  private static redis: Redis;
  private static subscribers: Map<
    string,
    ((request: unknown) => Promise<void>)[]
  >;

  constructor() {
    if (!Queue.subscribers) {
      Queue.redis = new Redis();
      Queue.subscribers = new Map();
    }
  }

  public async subscriber(
    channel: string,
    callback: (request: unknown) => Promise<void>
  ): Promise<void> {
    if (!Queue.subscribers.has(channel)) {
      Queue.redis.subscribe(channel, (err, count) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`Subscribed to ${channel} with ${count} subscribers`);
      });
    }

    if (!Queue.subscribers.has(channel)) {
      Queue.subscribers.set(channel, []);
    }

    Queue.subscribers.get(channel)!.push(callback);
  }

  public async publish(channel: string, request: unknown): Promise<void> {
    const serializedMessage = JSON.stringify(request);
    await new Redis().publish(channel, serializedMessage);
  }

  public listen() {
    Queue.redis.on("message", async (channel, message) => {
      try {
        const parsedMessage = JSON.parse(message);

        for (const subscriber of Queue.subscribers.get(channel) || []) {
          await subscriber(parsedMessage);

          console.log(`Executed subscriber for ${channel}`);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  public close() {
    Queue.redis.disconnect();
    console.log("Disconnected from Redis");
  }
}
