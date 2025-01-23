package DAO;

import static org.junit.Assert.assertEquals;

import java.sql.SQLException;
import java.time.LocalDate;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import dao.AdresseDAO;
import dao.LogementDAO;
import jdbc.Connector;
import modele.Adresse;
import modele.Charges;
import modele.Logement;
import modele.Loyer;
import modele.ModeDePaiment;
import modele.noteEnergetique;

public class LogementDAOTests {
  private LogementDAO logementDAO;
  private AdresseDAO adresseDAO;
  private Connector connector;
  private Logement l;
  private Adresse adresse;

  @Before
  public void setUp() throws SQLException {
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    this.logementDAO = new LogementDAO();
    this.adresseDAO = new AdresseDAO();
    this.adresse = new Adresse("10", "Rue de rangueil", "APT 13", "Paris", "75001");
    this.adresseDAO.create(adresse);
    this.l =
        new Logement(
            this.adresse,
            20,
            20,
            "12345678AB",
            true,
            "123456789012",
            950.0F,
            new Loyer(
                750.0F, 05, LocalDate.of(2024, 8, 11), LocalDate.of(2025, 9, 11), ModeDePaiment.CB),
            new Charges(200.0F, 10.0F, 10.0F, 5.0F, 45.0F),
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
    this.l = logementDAO.create(l, 1);
    assertEquals(l.getAdresse(), l.getAdresse());
  }

  @Test
  public void testFind() {
    this.l = logementDAO.create(l, 1);
    Logement logement = logementDAO.find(l.getId());
    assertEquals(l, logement);
  }

  @Test
  public void testUpdate() {
    this.l = logementDAO.create(l, 1);
    Logement logement = logementDAO.find(l.getId());
    logement.setReferenceLogement("Nouvelle ref");
    logementDAO.update(logement);
    Logement updatedLogement = logementDAO.find(l.getId());
    assertEquals(logement.getReferenceLogement(), updatedLogement.getReferenceLogement());
  }
}
