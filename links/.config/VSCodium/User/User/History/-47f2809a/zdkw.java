package DAO;

import java.sql.SQLException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import dao.ChargesDAO;
import jdbc.Connector;
import modele.Charges;

public class ChargesDAOTests {

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

  @Test
  public void testCreate() {
    Charges c = new Charges(1, 2, 3, 4, 5, 6);
    int idBienLouable = 1;
    int chargeId = chargesDAO.create(c, idBienLouable);
    assertNotEquals(chargeId, 1);
  }

  @Test
  public void testUpdate() {
    final int idBienLouable = 1;
    Charges c = new Charges(1, 2, 3, 4, 5, 6);
    c.setId(10);
    int chargeId = chargesDAO.create(c, idBienLouable);
    c.setEauPartieFixe(7);
    c.setId(11);
    int newChargesId = chargesDAO.update(c, idBienLouable);
    Charges updatedCharges = chargesDAO.find(newChargesId);

    assertEquals(c, updatedCharges);
  }
}
