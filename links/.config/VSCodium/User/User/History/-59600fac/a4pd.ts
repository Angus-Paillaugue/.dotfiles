type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";
type Log = { level: LogLevel; message: string };
type Config = { backendUrl: string, bufferSize?: number };

class Logger {
  private backendUrl: string;
  private buffer: Array<Log> = [];
  private bufferSize: number = 10; // Number of logs before sending
  #COLORS: Map<string, string> = new Map([
    ["red", "\x1b[31m"],
    ["green", "\x1b[32m"],
    ["yellow", "\x1b[33m"],
    ["blue", "\x1b[34m"],
    ["magenta", "\x1b[35m"],
    ["cyan", "\x1b[36m"],
    ["white", "\x1b[37m"],
    ["black", "\x1b[30m"],
    ["reset", "\x1b[0m"],
    ["bgRed", "\x1b[41m"],
    ["bgGreen", "\x1b[42m"],
    ["bgYellow", "\x1b[43m"],
    ["bgBlue", "\x1b[44m"],
    ["bgMagenta", "\x1b[45m"],
    ["bgCyan", "\x1b[46m"],
    ["bgWhite", "\x1b[47m"],
  ]);

  debug(message: string) {
    console.log(`${this.#COLORS.get("bgWhite")}${this.#COLORS.get("black")}[ DEBUG ]${this.#COLORS.get("reset")} ${message}`);
    this.#pushLog({ level: "debug", message });
  }

  info(message: string) {
    console.log(`${this.#COLORS.get("bgBlue")}[ INFO ]${this.#COLORS.get("reset")} ${message}`);
    this.#pushLog({ level: "info", message });
  }

  warn(message: string) {
    console.warn(`${this.#COLORS.get("bgYellow")}[ WARN ]${this.#COLORS.get("reset")} ${message}`);
    this.#pushLog({ level: "warn", message });
  }

  error(message: string) {
    console.error(`${this.#COLORS.get("bgRed")}[ ERROR ]${this.#COLORS.get("reset")} ${message}`);
    this.#pushLog({ level: "error", message });
  }

  fatal(message: string) {
    console.error(`${this.#COLORS.get("red")}[ FATAL ]${this.#COLORS.get("reset")} ${message}`);
    this.#pushLog({ level: "fatal", message });
  }

  constructor(config: Config) {
    if (!config.backendUrl) {
      throw new Error("backendUrl property is required");
    }
    this.backendUrl = config.backendUrl.replace(/\/$/, "");config.backendUrl

    if (config.bufferSize) {
      if (config.bufferSize <= 0) {
        throw new Error("bufferSize must be greater than 0");
      }
      this.bufferSize = config.bufferSize;
    }
  }

  #pushLog({ level, message }: Log) {
    this.buffer.push({ level, message });
    if (this.buffer.length >= this.bufferSize) {
      this.#flush();
    }
  }

  async #flush() {
    try {
      await fetch(this.backendUrl + '/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.buffer),
      });
      this.buffer = [];
    } catch (error) {
      console.error("Failed to send logs:", error);
    }
  }
}

export default Logger;
