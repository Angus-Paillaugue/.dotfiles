package jcdb;

import java.security.SecureRandom;

public class Auth {
  public static String hashPassword(String password) {
    SecureRandom random = new SecureRandom();
    byte[] salt = new byte[16];
    random.nextBytes(salt);
  }
}
