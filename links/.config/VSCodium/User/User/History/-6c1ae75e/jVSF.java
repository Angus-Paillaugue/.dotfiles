package DAO;

import java.sql.SQLException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import dao.LoyerDAO;
import jdbc.Connector;

public class LoyerDAOTests {

  private LoyerDAO loyerDAO;
  private Connector connector;
  private Loyer testLoyer;

  @Before
  public void setUp() throws SQLException {
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    loyerDAO = new LoyerDAO();
    
  }

  @After
  public void tearDown() throws SQLException {
    this.connector.getConnection().rollback();
    this.connector.closeConnection();
  }

  @Test
  public void testCreate() {
    int idBienLouable = 1;
    int idLoyer = loyerDAO.create();
    assertNotEquals(idLoyer, 1);
  }

}
