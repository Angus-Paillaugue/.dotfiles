package DAO;

import static org.junit.Assert.assertNotEquals;

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
    this.testLoyer = new Loyer(750.0F, 05, LocalDate.of(2024, 8, 11), LocalDate.of(2025, 9, 11), ModeDePaiment.CB);
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
    assertNotEquals(idLoyer, 1);
  }

  @Test
  public void testUpdate() {
    int idBienLouable = 1;
    int idLoyer = loyerDAO.create(this.testLoyer, idBienLouable);
    this.testLoyer.setMontant(800.0F);
    this.testLoyer.setMoisPreavis(03);
    this.testLoyer.setDateDebut(LocalDate.of(2024, 9, 11));
    this.testLoyer.setDateFin(LocalDate.of(2025, 10, 11));
    this.testLoyer.setModeDePaiment(ModeDePaiment.CHEQUE);
    loyerDAO.update(this.testLoyer, idLoyer);
    Loyer updatedLoyer = loyerDAO.getById(idLoyer);
    assertNotEquals(this.testLoyer, updatedLoyer);
  }

}
