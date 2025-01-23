package DAO;

import static org.junit.Assert.*;

import dao.BatimentDAO;
import dao.AdresseDAO;
import jdbc.Connector;
import modele.Adresse;
import modele.Batiment;
import modele.TypeDeBatiment;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.sql.SQLException;

public class BatimentDAOTests {

  private BatimentDAO batimentDAO;
  private AdresseDAO adresseDAO;
  private Connector connector;

  @Before
  public void setUp() throws SQLException {
    // Obtenir l'instance de Connector et configurer la connexion
    Connector.createDatabase();
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false); // Désactiver l'auto-commit pour les tests

    // Initialiser les DAO
    batimentDAO = new BatimentDAO();
    adresseDAO = new AdresseDAO();
  }

  @After
  public void tearDown() throws SQLException {
    // Annuler les modifications effectuées pendant le test
    this.connector.getConnection().rollback();
    this.connector.closeConnection();
  }

  @Test
  public void testCreate() {
    // Arrange
    Adresse adresse = new Adresse(2, "123", "Main St", "Springfield", "12345");
    adresse.setNumero("123 Main St");
    adresse = adresseDAO.create(adresse); // Créez d'abord l'adresse
    Batiment batiment =
        new Batiment(TypeDeBatiment.MAISON, adresse, "12345"); // Utilisation de numeroFiscal

    // Act
    Batiment result = batimentDAO.create(batiment);

    // Assert
    assertNotNull(result);
    assertEquals(1, result.getId()); // Vérifiez que l'ID est correct
    assertEquals(adresse.getId(), result.getAdresse().getId());
    assertEquals("12345", result.getNumeroFiscal()); // Vérifiez que le numeroFiscal est correct
  }

  @Test
  public void testFind() {
    // Arrange
    Adresse adresse = new Adresse(2, "123", "Main St", "Springfield", "12345");
    adresse.setNumero("123 Main St");
    adresse = adresseDAO.create(adresse); // Créez d'abord l'adresse
    Batiment batiment =
        new Batiment(TypeDeBatiment.MAISON, adresse, "12345"); // Utilisation de numeroFiscal
    batimentDAO.create(batiment); // Créez le bâtiment pour le test

    // Act
    Batiment result = batimentDAO.find(batiment.getId());

    // Assert
    assertNotNull(result);
    assertEquals(batiment.getId(), result.getId());
    assertEquals(TypeDeBatiment.MAISON, result.getTypeBatiment());
    assertEquals("12345", result.getNumeroFiscal()); // Vérifiez que le numeroFiscal est correct
  }

  @Test(expected = NullPointerException.class)
  public void testCreateSQLException() {
    // Arrange
    Batiment batiment =
        new Batiment(
            TypeDeBatiment.MAISON,
            new Adresse(2, "123", "Main St", "Springfield", "12345"),
            "12345"); // Utilisation de numeroFiscal

    // Simuler une exception en essayant de créer un bâtiment sans adresse
    batiment.setAdresse(null);

    // Act
    Batiment result = batimentDAO.create(batiment);

    // Assert
    assertNull(result);
  }

  @Test
  public void testFindNotFound() {
    // Act
    Batiment result = batimentDAO.find(999); // ID qui n'existe pas

    // Assert
    assertNull(result);
  }
}
