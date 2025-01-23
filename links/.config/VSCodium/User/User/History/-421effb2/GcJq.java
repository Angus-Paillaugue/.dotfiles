package DAO;

import java.sql.SQLException;

import org.junit.Before;
import org.junit.Test;

import dao.GarantDAO;
import jdbc.Connector;

public class GarantDAOTests {

  private GarantDAO garantDAO;
  private Connector connector;

  @Before
  public void setUp() throws SQLException {
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    garantDAO = new GarantDAO();
  }

  @Test
  public void testAjouterGarant() {
    
  }
}
