package utils;

public class Logger {
  public static final String ANSI_RESET = "\u001B[0m";
  public static final String ANSI_BLACK = "\u001B[30m";
  public static final String ANSI_RED = "\u001B[31m";
  public static final String ANSI_GREEN = "\u001B[32m";
  public static final String ANSI_YELLOW = "\u001B[33m";
  public static final String ANSI_BLUE = "\u001B[34m";
  public static final String ANSI_PURPLE = "\u001B[35m";
  public static final String ANSI_CYAN = "\u001B[36m";
  public static final String ANSI_WHITE = "\u001B[37m";

  public static final String BLACK_BOLD = "\033[1;30m"; // BLACK
  public static final String RED_BOLD = "\033[1;31m"; // RED
  public static final String GREEN_BOLD = "\033[1;32m"; // GREEN
  public static final String YELLOW_BOLD = "\033[1;33m"; // YELLOW
  public static final String BLUE_BOLD = "\033[1;34m"; // BLUE
  public static final String PURPLE_BOLD = "\033[1;35m"; // PURPLE
  public static final String CYAN_BOLD = "\033[1;36m"; // CYAN
  public static final String WHITE_BOLD = "\033[1;37m"; // WHITE

  public static void error(Exception e) {
    System.out.println(ANSI_RED + "✗ " + ANSI_RESET + e.getMessage());
  }

  public static void error(String message) {
    System.out.println(ANSI_RED + "✗ " + ANSI_RESET + message);
  }

  public static void log(String message) {
    System.out.println("["+ CYAN_BOLD+"LOG"+ANSI_RESET+"]: "+message);
  }

  public static void success(String message) {
    System.out.println(ANSI_GREEN + "✓ " + ANSI_RESET + message);
  }

  public static void warn(String message) {
    System.out.println(ANSI_YELLOW + "! " + ANSI_RESET + message);
  }
}
