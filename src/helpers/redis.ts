import { Command } from "lucide-react";
import { type } from "os";

const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

type Commmand = "zrange" | "sismember" | "get" | "smembers";

export async function fetchRedis(
  command: Commmand,
  ...args: (string | number)[]
) {
  const commmandUrl = `${upstashRedisRestUrl}/${command}/${args.join("/")}`;

  const response = await fetch(commmandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Error executing Redis command: ${response.statusText}`);
  }
  const data = await response.json();
  console.log("data", data);
  return data.result;
}
