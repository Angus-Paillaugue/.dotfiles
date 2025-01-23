class Logger {
  static #COLORS = new Map([
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

  static debug(message) {
    console.log(`${this.#COLORS.get("bgWhite")}${this.#COLORS.get("black")}[ DEBUG ]${this.#COLORS.get("reset")} ${message}`);
  }

  static info(message) {
    console.log(`${this.#COLORS.get("white")}${this.#COLORS.get("bgBlue")}[ INFO ]${this.#COLORS.get("reset")} ${message}`);
  }

  static warn(message) {
    console.warn(`${this.#COLORS.get("white")}${this.#COLORS.get("bgYellow")}[ WARN ]${this.#COLORS.get("reset")} ${message}`);
  }

  static error(message) {
    console.error(`${this.#COLORS.get("white")}${this.#COLORS.get("bgRed")}[ ERROR ]${this.#COLORS.get("reset")} ${message}`);
  }

  static fatal(message) {
    console.error(`${this.#COLORS.get("red")}[ FATAL ]${this.#COLORS.get("reset")} ${message}`);
  }
}

export default Logger;
