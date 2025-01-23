package utils;

public class Logger {
  public static void error(Exception e) {
    System.out.println("✗ " + e.getMessage());
    e.printStackTrace();
  }

  public static void error(String message) {
    System.out.println("✗ " + message);
  }

  public static void log(String message) {
    System.out.println("✓ " + message);
  }

  public static void warn(String message) {
    System.out.println("! " + message);
  }
}
