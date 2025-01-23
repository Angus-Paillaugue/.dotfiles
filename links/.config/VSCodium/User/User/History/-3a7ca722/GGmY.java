package DAO;

import java.sql.SQLException;


import org.junit.After;
import org.junit.Before;

import dao.LogementDAO;
import jdbc.Connector;
import modele.Logement;

public class LogementDAOTests {
  private LogementDAO logementDAO;
  private Connector connector;
  private Logement l;

  @Before
  public void setUp() throws SQLException {
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    logementDAO = new LogementDAO();
  }

  @After
  public void tearDown() throws SQLException {
    this.connector.getConnection().rollback();
    this.connector.closeConnection();
  }

  @Test
  public void testCreate() {
    Logement l = new Logement(1, 2, 3, 4, 5, 6);
    int idBienLouable = 1;
    int logementId = logementDAO.create(l, idBienLouable);
    assertNotEquals(logementId, 1);
  }
}
