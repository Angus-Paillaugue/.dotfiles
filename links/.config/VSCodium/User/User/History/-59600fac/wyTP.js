class Logger {
  #COLORS = new Map([
    ["red", "\x1b[31m"],
    ["green", "\x1b[32m"],
    ["yellow", "\x1b[33m"],
    ["blue", "\x1b[34m"],
    ["magenta", "\x1b[35m"],
    ["cyan", "\x1b[36m"],
    ["white", "\x1b[37m"],
    ["reset", "\x1b[0m"],
  ]);

  static log(message) {
    console.log(`[LOG] ${message}`);
  }

  static error(message) {
    console.error(`[ERROR] ${message}`);
  }

  static warn(message) {
    console.warn(`[WARN] ${message}`);
  }
}

export default Logger;
