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
    ["bgRed", "\x1b[41m"],
    ["bgGreen", "\x1b[42m"],
    ["bgYellow", "\x1b[43m"],
    ["bgBlue", "\x1b[44m"],
    ["bgMagenta", "\x1b[45m"],
    ["bgCyan", "\x1b[46m"],
    ["bgWhite", "\x1b[47m"],
  ]);

  static log(message) {
    console.log(`[ LOG ] ${message}`);
  }

  static error(message) {
    console.error(`[ ERROR ] ${message}`);
  }

  static warn(message) {
    console.warn(`[ WARN ] ${message}`);
  }

  static fatal(message) {
    console.error(`[ FATAL ] ${message}`);
  }
}

export default Logger;
