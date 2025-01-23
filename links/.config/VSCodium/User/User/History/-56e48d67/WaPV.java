package DAO;

import java.sql.SQLException;
import java.time.LocalDate;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import dao.ProprietaireDAO;
import jdbc.Connector;
import modele.Adresse;
import modele.Batiment;
import modele.Charges;
import modele.Logement;
import modele.Loyer;
import modele.ModeDePaiment;
import modele.Proprietaire;
import modele.TypeDeBatiment;
import modele.noteEnergetique;

public class ProprietaireDAOTests {
  private ProprietaireDAO proprietaireDAO;
  private Connector connector;

  @Before
  public void setUp() throws SQLException {
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    proprietaireDAO = new ProprietaireDAO();
  }

  @After
  public void tearDown() throws SQLException {
    this.connector.getConnection().rollback();
    this.connector.closeConnection();
  }

  @Test
  public void testFind() {
    Proprietaire p =
        new Proprietaire(
            "Thierry",
            "Millan",
            new Adresse("8", "Avenue de rangueil", "Toulouse", "31400"),
            "tm@univ-tlse3.fr",
            "0606060606");
    p = proprietaireDAO.create(p);
    Proprietaire p2 = proprietaireDAO.find(p.getId());
    assertNotNull(p2);
    assertEquals(p.getNom(), p2.getNom());
  }

  @Test
  public void testDelete() {
    Proprietaire p =
        new Proprietaire(
            "Thierry",
            "Millan",
            new Adresse("8", "Avenue de rangueil", "Toulouse", "31400"),
            "tm@univ-tlse3.fr",
            "0606060606");
    p = proprietaireDAO.create(p);
    proprietaireDAO.delete(p.getId());
    Proprietaire p2 = proprietaireDAO.find(p.getId());
    assertEquals(p2, null);
  }

  @Test
  public void testFindByEmail() {
    Proprietaire p =
        new Proprietaire(
            "Thierry",
            "Millan",
            new Adresse("8", "Avenue de rangueil", "Toulouse", "31400"),
            "tm@univ-tlse3.fr",
            "0606060606");
    p = proprietaireDAO.create(p);
    Proprietaire p2 = proprietaireDAO.findByMail("tm@univ-tlse3.fr");
    assertEquals(p2.getNom(), p.getNom());
  }

  @Test
  public void testAjouterBatiment() {
    Adresse adresse = new Adresse(2, "123", "Main St", "Springfield", "12345");
    Batiment b = new Batiment(TypeDeBatiment.MAISON, adresse, "31000");
    Proprietaire p =
        new Proprietaire(
            "Thierry",
            "Millan",
            new Adresse("8", "Avenue de rangueil", "Toulouse", "31400"),
            "tm@univ-tlse3.fr",
            "0606060606");

    p = proprietaireDAO.create(p);
    p = proprietaireDAO.addBatiment(p, b);
    assertEquals(p.getBatiment().size(), 1);
  }

  @Test
  public void testAjouterLogement() {
    Adresse adresse = new Adresse(2, "123", "Main St", "Springfield", "12345");
    Adresse adresseLogement = new Adresse("10", "Rue de rangueil", "APT 13", "Paris", "75001");
    Batiment b = new Batiment(TypeDeBatiment.MAISON, adresse, "31000");
    Loyer loyer =
        new Loyer(
            750.0F, 05, LocalDate.of(2024, 8, 11), LocalDate.of(2025, 9, 11), ModeDePaiment.CB);
    Charges charges = new Charges(100, 50, 30, 20, 200, 2, 2, LocalDate.now());
    Logement l =
        new Logement(
            adresseLogement,
            20,
            20,
            "12345678AB",
            true,
            "123456789012",
            950.0F,
            loyer,
            charges,
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
    Proprietaire p =
        new Proprietaire(
            "Thierry",
            "Millan",
            new Adresse("8", "Avenue de rangueil", "Toulouse", "31400"),
            "tm@univ-tlse3.fr",
            "0606060606");

    p = proprietaireDAO.create(p);
    p = proprietaireDAO.addBatiment(p, b);
    p = proprietaireDAO.addLogement(p, l, b);
    assertEquals("Paris", p.getBatiment().get(0).getBiensLouables().get(0).getAdresse().getVille());
  }
}
