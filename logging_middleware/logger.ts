import axios from 'axios';

const VALID_STACK = ["backend", "frontend"] as const;

const VALID_LEVEL = ["debug", "info", "warn", "error", "fatal"] as const;

const VALID_PACKAGE = [
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service",
  "api",
  "component",
  "hook",
  "page",
  "state",
  "style",
  "auth",
  "config",
  "middleware",
  "utils",
] as const;

export type Stack = (typeof VALID_STACK)[number];
export type Level = (typeof VALID_LEVEL)[number];
export type Package = (typeof VALID_PACKAGE)[number];

const LOG_API_URL = "http://20.207.122.201/evaluation-service/logs";

export const Log = async (
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
): Promise<void> => {
  try {
    if (!VALID_STACK.includes(stack as any)) {
      throw new Error(`Invalid stack: ${stack}`);
    }

    if (!VALID_LEVEL.includes(level as any)) {
      throw new Error(`Invalid level: ${level}`);
    }

    if (!VALID_PACKAGE.includes(pkg as any)) {
      throw new Error(`Invalid package: ${pkg}`);
    }

    if (!message || message.trim().length === 0) {
      throw new Error("Message cannot be empty");
    }

    await axios.post(LOG_API_URL, {
      stack,
      level,
      package: pkg,
      message
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error logging message (API):", error.response?.data || error.message);
    } else {
      console.error("Error logging message:", error instanceof Error ? error.message : error);
    }
  }
};
