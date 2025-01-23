package DAO;

import java.sql.SQLException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import dao.ProprietaireDAO;
import jdbc.Connector;
import modele.Adresse;
import modele.Proprietaire;

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
  public void testCreate() {
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
    assertEquals(p2.getId(), p.getId());
    assertEquals(p2.getNom(), p.getNom());
    assertEquals(p2.getBatiment(), p.getBatiment());
  }

  @Test
  public void testFind() {
    Proprietaire p2 = proprietaireDAO.find(1);
    assertNotNull(p2);
  }

  @Test
  public void testUpdate() {
    Proprietaire p =
        new Proprietaire(
            "Thierry",
            "Millan",
            new Adresse("8", "Avenue de rangueil", "Toulouse", "31400"),
            "tm@univ-tlse3.fr",
            "0606060606");
    p = proprietaireDAO.create(p);
    p.setNom("Thierry2");
    proprietaireDAO.update(p);
    Proprietaire p2 = proprietaireDAO.find(p.getId());

    assertEquals(p.getNom(), p2.getNom());
  }

  @Test
  public void testDelete() {
    Proprietaire p = new Proprietaire(
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
    Proprietaire p = new Proprietaire(
        "Thierry",
        "Millan",
        new Adresse("8", "Avenue de rangueil", "Toulouse", "31400"),
        "tm@univ-tlse3.fr",
        "0606060606");
    p = proprietaireDAO.create(p);
    Proprietaire p2 = proprietaireDAO.findByMail("tm@univ-tlse3.fr");
    System.out.println(p);
    assertEquals(p2, p);
  }
}
