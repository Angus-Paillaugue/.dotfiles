package DAO;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.sql.SQLException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import modele.Adresse;
import dao.AdresseDAO;
import jdbc.Connector;

public class AdresseDAOTests {
  private AdresseDAO adresseDAO;
  private Connector connector;

  @Before
  public void setUp() throws SQLException {
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    adresseDAO = new AdresseDAO();
  }

  @After
  public void tearDown() throws SQLException {
    this.connector.getConnection().rollback();
    this.connector.closeConnection();
  }

  @Test
  public void testAdresseSansComplement() {
    Adresse adresse = new Adresse(2, "123", "Main St", "Springfield", "12345");
    adresse = this.adresseDAO.create(adresse);
    Adresse fetchedAdress = this.adresseDAO.find(adresse.getId());
    assertNotNull(fetchedAdress);
    assertEquals(adresse, fetchedAdress);
  }

  @Test
  public void testAdresseAvecComplement() {
    Adresse adresse = new Adresse(2, "123", "Main St", "Apt 1", "Springfield", "12345");
    adresse = this.adresseDAO.create(adresse);
    Adresse fetchedAdress = this.adresseDAO.find(adresse.getId());
    assertNotNull(fetchedAdress);
    assertEquals(adresse, fetchedAdress);
  }

  @Test
  public void testAdresseInexistante() {
    Adresse fetchedAdress = this.adresseDAO.find(999);
    assertNull(fetchedAdress);
  }

  @Test
  public void testSuppressionAdresseExistante() {
    Adresse adresse = new Adresse(2, "123", "Main St", "Springfield", "12345");
    adresse = this.adresseDAO.create(adresse);
    Adresse fetchedAdress = this.adresseDAO.find(adresse.getId());
    assertNotNull(fetchedAdress);
    assertEquals(adresse, fetchedAdress);

    this.adresseDAO.delete(adresse.getId());
    fetchedAdress = this.adresseDAO.find(adresse.getId());
    assertNull(fetchedAdress);
  }
}
