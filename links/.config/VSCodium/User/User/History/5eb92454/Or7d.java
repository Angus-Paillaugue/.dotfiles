package utils;

public class ErrorHandling {
  public static void ErrorHandling.handleException(Exception e) {
    System.out.println("✗ " + e.getMessage());
    e.printStackTrace();
  }
}
