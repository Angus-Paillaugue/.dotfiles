class Logger {
  static #COLORS = new Map([
    ["red", "\x1b[31m"],
    ["green", "\x1b[32m"],
    ["yellow", "\x1b[33m"],
    ["blue", "\x1b[34m"],
    ["magenta", "\x1b[35m"],
    ["cyan", "\x1b[36m"],
    ["white", "\x1b[37m"],
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
    console.log(`${#COLORS.get("")}[ DEBUG ]${#COLORS.get("reset")} ${message}`);
  }

  static info(message) {
    console.log(`${#COLORS.get("")}[ INFO ]${#COLORS.get("reset")} ${message}`);
  }

  static warn(message) {
    console.warn(`${#COLORS.get("")}[ WARN ]${#COLORS.get("reset")} ${message}`);
  }

  static error(message) {
    console.error(`${#COLORS.get("")}[ ERROR ]${#COLORS.get("reset")} ${message}`);
  }

  static fatal(message) {
    console.error(`${#COLORS.get("")}[ FATAL ]${#COLORS.get("reset")} ${message}`);
  }
}

export default Logger;
