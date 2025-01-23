package DAO;

import java.sql.SQLException;

import org.junit.After;
import org.junit.Before;

import dao.ChargesDAO;
import jdbc.Connector;

public class LoyerDAOTests {

  private ChargesDAO chargesDAO;
  private Connector connector;

  @Before
  public void setUp() throws SQLException {
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    chargesDAO = new ChargesDAO();
  }

  @After
  public void tearDown() throws SQLException {
    this.connector.getConnection().rollback();
    this.connector.closeConnection();
  }

}
