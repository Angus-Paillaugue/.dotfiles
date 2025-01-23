package DAO;

import static org.junit.Assert.*;

import java.util.LinkedList;

import dao.AdresseDAO;
import dao.LocationDAO;
import jdbc.Connector;
import modele.Adresse;
import modele.Charges;
import modele.Location;
import modele.Logement;
import modele.Loyer;
import modele.ModeDePaiment;
import modele.noteEnergetique;
import modele.Personne;
import modele.SituationFamiliale;
import modele.TypeDeContratDeTravail;

import org.junit.Before;
import org.junit.Test;

import java.sql.SQLException;
import java.time.LocalDate;

public class LocationDAOTests {
  private AdresseDAO adresseDAO;
  private Adresse adresse;
  private LocationDAO locationDAO;
  private Connector connector;
  private Location location;
  private Logement logement;

  @Before
  public void setUp() throws SQLException {
    // Obtenir l'instance de Connector et configurer la connexion
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    // Initialiser les DAO
    this.locationDAO = new LocationDAO();
    this.adresseDAO = new AdresseDAO();
    this.adresse = new Adresse("10", "Rue de rangueil", "APT 13", "Paris", "75001");
    this.adresseDAO.create(adresse);
    this.logement =
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
            new Charges(100, 50, 30, 20, 200, 2, 2, LocalDate
                    .now()),
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
    Personne p =
        new Personne(
            "Picquart",
            "Samuel",
            1,
            LocalDate.of(2003, 02, 18),
            "Bayonne",
            SituationFamiliale.MARIE,
            "Responsable d'équipes",
            "Mcdo",
            TypeDeContratDeTravail.CDI,
            850F,
            560F,
            "samuel.picq@test.fr",
            "0909090909",
            new Adresse(8, "rue des rose", "apt2", "31400", "tlse"));
    this.location =
        new Location(
            1, p, new LinkedList<Personne>(), LocalDate.of(2022, 02, 5), this.adresse, 500.f);
  }

  @Test
  public void testCreate() {
    // Arrange

    // Act
    locationDAO.create(location, logement);
    Location result = locationDAO.find(location.getId());

    // Assert
    assertNotNull(result);
    assertEquals(this.adresse, logement.getAdresse());
  }

  @Test
  public void testFind() {
    // Arrange
    Location result =
        this.locationDAO.create(this.location, this.logement); // Créer une location pour le test
    // Assert
    assertNotNull(location);
    assertEquals(location.getId(), result.getId());
  }

  @Test
  public void testFindNotFound() {
    // Act
    Location result = locationDAO.find(999); // ID qui n'existe pas

    // Assert
    assertNull(result);
  }

  @Test(expected = NullPointerException.class)
  public void testCreateNullLocation() {
    // Arrange
    Location location = null;
    Logement logement = null;

    // Act
    locationDAO.create(location, logement);

    // Assert
    fail("Une exception aurait dû être levée pour une location nulle");
  }
}
