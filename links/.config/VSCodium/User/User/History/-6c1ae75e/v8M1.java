package DAO;

import java.sql.SQLException;

import org.junit.After;
import org.junit.Before;

import dao.LoyerDAO;
import jdbc.Connector;

public class LoyerDAOTests {

  private LoyerDAO LoyerDAO;
  private Connector connector;

  @Before
  public void setUp() throws SQLException {
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    LoyerDAO = new LoyerDAO();
  }

  @After
  public void tearDown() throws SQLException {
    this.connector.getConnection().rollback();
    this.connector.closeConnection();
  }

}
