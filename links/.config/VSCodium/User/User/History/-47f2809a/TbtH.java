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
    Charges c = new Charges(2, 3, 4, 5, 6);
    int idBienLouable = 1;
    Charges charge1 = chargesDAO.create(c, idBienLouable);
    Charges chargeId2 = chargesDAO.create(c, idBienLouable);
    System.out.println(chargeId1);
    System.out.println(chargeId2);
    assertNotEquals(chargeId1.getId(), chargeId2.getId());
  }

  @Test
  public void testUpdate() {
    final int idBienLouable = 1;
    Charges c = new Charges(1, 2F, 3F, 4F, 5F, 6F);
    chargesDAO.create(c, idBienLouable);
    c.setEauPartieFixe(7);
    Charges newCharges = chargesDAO.update(c, idBienLouable);
    Charges updatedCharges = chargesDAO.find(newCharges.getId());
    assertEquals(c.getEauPartieFixe(), updatedCharges.getEauPartieFixe(), 0.0F);
  }
}
