package dao.jdbc;

import com.password4j.BcryptFunction;
import com.password4j.Hash;
import com.password4j.Password;
import com.password4j.types.Bcrypt;

/**
 * This class is used to hash and verify passwords
 *
 * @see https://davidbertoldi.medium.com/hashing-passwords-in-java-757e787ce71c
 */
public class Auth {

  /**
   * Hashes the given password using the Bcrypt hashing algorithm.
   *
   * @param password the password to be hashed
   * @return the hashed password as a String
   */
  public static String hashPassword(String password) {
    BcryptFunction bcrypt = BcryptFunction.getInstance(Bcrypt.B, 12);
    Hash hash = Password.hash(password).with(bcrypt);
    return hash.getResult();
  }

  /**
   * Verifies if the input password matches the stored hashed password.
   *
   * @param inputPassword the password provided by the user
   * @param storedHash the hashed password stored in the database
   * @return true if the input password matches the stored hash, false otherwise
   */
  public static boolean verifyPassword(String inputPassword, String storedHash) {
    BcryptFunction bcrypt = BcryptFunction.getInstance(Bcrypt.B, 12);

    return Password.check(inputPassword, storedHash).with(bcrypt);
  }
}
