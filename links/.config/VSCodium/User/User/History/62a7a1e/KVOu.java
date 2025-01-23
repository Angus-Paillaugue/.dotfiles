package jcdb;

import java.security.MessageDigest;
import java.security.SecureRandom;

public class Auth {
  public static String hashPassword(String password) {
    SecureRandom random = new SecureRandom();
    byte[] salt = new byte[16];
    random.nextBytes(salt);
    MessageDigest md = MessageDigest.getInstance("SHA-512");
    md.update(salt);
    byte[] hashedPassword = md.digest(password.getBytes());
    return new String(hashedPassword);
  }
}
