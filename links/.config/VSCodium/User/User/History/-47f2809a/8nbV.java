package DAO;

import java.sql.SQLException;

import org.junit.After;
import org.junit.Before;

import dao.AdresseDAO;
import jdbc.Connector;

public class ChargesDAOTests {

  private AdresseDAO adresseDAO;
  private Connector connector;

  @Before
  public void setUp() throws SQLException {
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    adresseDAO = new AdresseDAO();
  }

  @After
  public void tearDown() throws SQLException {
    this.connector.getConnection().rollback();
    this.connector.closeConnection();
  }

}
