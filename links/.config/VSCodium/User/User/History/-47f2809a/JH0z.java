package DAO;

import java.sql.SQLException;
import java.time.LocalDate;

import static org.junit.Assert.assertEquals;

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
  public void testUpdate() {
    final int idBienLouable = 1;
    Charges c = new Charges(100, 50, 30, 20, 200, 2, 2, LocalDate.now());
    chargesDAO.create(c, idBienLouable);
    c.setEauPartieFixe(7);
    Charges newCharges = chargesDAO.update(c, idBienLouable);
    Charges updatedCharges = chargesDAO.find(newCharges.getId());
    assertEquals(c.getEauPartieFixe(), updatedCharges.getEauPartieFixe(), 0.0F);
  }
}
