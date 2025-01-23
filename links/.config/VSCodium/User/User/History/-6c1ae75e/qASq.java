package DAO;

import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.sql.SQLException;
import java.time.LocalDate;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import dao.LoyerDAO;
import jdbc.Connector;
import modele.Loyer;
import modele.ModeDePaiment;

public class LoyerDAOTests {

  private LoyerDAO loyerDAO;
  private Connector connector;
  private Loyer testLoyer;

  @Before
  public void setUp() throws SQLException {
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    loyerDAO = new LoyerDAO();
    this.testLoyer =
        new Loyer(
            750.0F, 5, LocalDate.of(2024, 8, 11), LocalDate.of(2025, 9, 11), ModeDePaiment.CB);
  }

  @After
  public void tearDown() throws SQLException {
    this.connector.getConnection().rollback();
    this.connector.closeConnection();
  }

  @Test
  public void testCreate() {
    int idBienLouable = 1;
    int idLoyer = loyerDAO.create(this.testLoyer, idBienLouable);
    assertEquals(1, idLoyer);
  }

  @Test
  public void testFind() {
    int idBienLouable = 1;
    int idLoyer = loyerDAO.create(this.testLoyer, idBienLouable);
    Loyer loyer = loyerDAO.find(idLoyer);
    assertNotNull(loyer);
    this.testLoyer.setId(loyer.getId());
    assertEquals(this.testLoyer, loyer);
  }

  @Test
  public void testFindFail() {
    Loyer loyer = loyerDAO.find(-1);
    assertEquals(loyer, null);
  }

  @Test
  public void testUpdate() {
    int idBienLouable = 1;
    int idLoyer = loyerDAO.create(this.testLoyer, idBienLouable);
    Loyer updatedLoyer =
        new Loyer(
            800.0F, 10, LocalDate.of(2024, 8, 11), LocalDate.of(2025, 9, 11), ModeDePaiment.CB);
    loyerDAO.update(updatedLoyer, idLoyer);
    Loyer loyer = loyerDAO.find(idLoyer);
    assertNotNull(loyer);
    Loyer expected = new Loyer(idBienLouable, idLoyer, null, null, null);
    assertEquals(expected, loyer);
  }

  @Test
  public void testUpdateFail() {
    Loyer updatedLoyer =
        new Loyer(
            800.0F, 10, LocalDate.of(2024, 8, 11), LocalDate.of(2025, 9, 11), ModeDePaiment.CB);
    loyerDAO.update(updatedLoyer, -1);
    Loyer loyer = loyerDAO.find(-1);
    assertEquals(loyer, null);
  }
}
