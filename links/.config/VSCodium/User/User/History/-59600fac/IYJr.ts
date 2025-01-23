type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";
type Log = { level: LogLevel; message: string };

class Logger {
  private backendUrl: string;
  private buffer: Array<Log> = [];
  private bufferSize: number = 10; // Number of logs before sending
  static #COLORS: Map<string, string> = new Map([
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
    console.log(`${#COLORS.get("bgWhite")}${#COLORS.get("black")}[ DEBUG ]${#COLORS.get("reset")} ${message}`);
    this.#pushLog({ level: "debug", message });
  }

  info(message: string) {
    console.log(`${#COLORS.get("bgBlue")}[ INFO ]${#COLORS.get("reset")} ${message}`);
    this.#pushLog({ level: "info", message });
  }

  warn(message: string) {
    console.warn(`${#COLORS.get("bgYellow")}[ WARN ]${#COLORS.get("reset")} ${message}`);
    this.#pushLog({ level: "warn", message });
  }

  error(message: string) {
    console.error(`${#COLORS.get("bgRed")}[ ERROR ]${#COLORS.get("reset")} ${message}`);
    this.#pushLog({ level: "error", message });
  }

  fatal(message: string) {
    console.error(`${#COLORS.get("red")}[ FATAL ]${#COLORS.get("reset")} ${message}`);
    this.#pushLog({ level: "fatal", message });
  }

  constructor(backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  #pushLog({ level, message }: Log) {
    this.buffer.push({ level, message });
    if (this.buffer.length >= this.bufferSize) {
      this.#flush();
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
