package dao;

import utils.Logger;

/**
 * Exception lancée lorsqu'une erreur survient dans un objet DAO.
 */
public class DAOException extends Exception {
  public DAOException(String message, Throwable cause) {
    super(message, cause);
    Logger.error(message);
  }
}
