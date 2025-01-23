package DAO;

import static org.junit.Assert.assertNotEquals;

import java.sql.SQLException;
import java.time.LocalDate;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import dao.LogementDAO;
import jdbc.Connector;
import modele.Adresse;
import modele.Logement;
import modele.Loyer;
import modele.ModeDePaiment;
import modele.noteEnergetique;

public class LogementDAOTests {
  private LogementDAO logementDAO;
  private Connector connector;
  private Logement l;

  @Before
  public void setUp() throws SQLException {
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    logementDAO = new LogementDAO();
    this.l = new Logement(
          new Adresse("10", "Rue de rangueil", "APT 13", "Paris", "75001"),
          "12345678AB",
          true,
          "123456789012",
          950.0F,
          new Loyer(750.0F, 05, LocalDate.of(2024, 8, 11), LocalDate.of(2025, 9, 11), ModeDePaiment.CB),
          charges1,
          "Droite",
          LocalDate.of(2018, 1, 1),
          LocalDate.of(2019, 2, 2),
          "/chemin/constatAmiante.pdf",
          "/chemin/constatPlomb.pdf",
          "/chemin/constatElec.pdf",
          noteEnergetique.A,
          noteEnergetique.C,
          "Ref logement",
          true,
          "Equipement fibre...");
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
