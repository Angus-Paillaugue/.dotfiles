package utils;

import java.util.HashMap;
import java.util.Map;

/**
 * The Logger class provides methods to log messages with different levels of severity. It supports
 * logging error, success, warning, and general log messages with ANSI color codes.
 */
public class Logger {
  private static final String ANSI_YELLOW = "\u001B[33m";;
	private static final Map<String, String> ANSI_COLORS = new HashMap<>();

	static {
		ANSI_COLORS.put("RESET", "\u001B[0m");
		ANSI_COLORS.put("RED", "\u001B[31m");
		ANSI_COLORS.put("GREEN", "\u001B[32m");
		ANSI_COLORS.put("YELLOW", "\u001B[33m");
		ANSI_COLORS.put("CYAN_BOLD", "\033[1;36m");
	}

  /**
   * Logs an error message to the console with red color formatting.
   *
   * @param e the exception whose message will be logged
   */
  public static void error(Exception e) {
    System.out.println(ANSI_COLORS.get("RED") + "✗ " + ANSI_COLORS.get("RESET") + (e.getMessage() == null ? e.toString() : e.getMessage()));
  }

  /**
   * Logs an error message to the console with red color formatting.
   *
   * @param e the exception whose message will be logged
   */
  public static void error(String message) {
    System.out.println(ANSI_COLORS.get("RED") + "✗ " + ANSI_COLORS.get("RESET") + message);
  }

  /**
   * Logs a message to the console with a specific format.
   *
   * @param message the message to be logged
   */
  public static void log(String message) {
    System.out.println("[" + ANSI_COLORS.get("CYAN_BOLD") + "LOG" + ANSI_COLORS.get("RESET") + "]: " + message);
  }

  /**
   * Logs a success message to the console with a green checkmark.
   *
   * @param message The success message to be logged.
   */
  public static void success(String message) {
    System.out.println(ANSI_COLORS.get("GREEN") + "✓ " + ANSI_COLORS.get("RESET") + message);
  }

  /**
   * Logs a warning message to the console with a yellow color.
   *
   * @param message The warning message to be logged.
   */
  public static void warn(String message) {
    System.out.println(ANSI_COLORS.get("YELLOW") + "! " + ANSI_COLORS.get("RESET") + message);
  }
}
