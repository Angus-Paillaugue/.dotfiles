import static org.junit.Assert.*;
import org.junit.Test;
import java.time.LocalDate;
import java.util.*;
import modele.Location;
import modele.Personne;
import modele.Adresse;

public class LocationTests {

  @Test
  public void testSinglePersonConstructor() {
    Personne locataire =
        new Personne(
            "Doe",
            "John",
            1,
            LocalDate.of(1990, 1, 1),
            "Springfield",
            null,
            "Engineer",
            "Company",
            null,
            3000,
            500,
            "john.doe@example.com",
            "1234567890",
            null);
    locataire.setIdLocataire(1);
    Personne locataire2 =
        new Personne(
            "Doe",
            "Jane",
            2,
            LocalDate.of(1992, 2, 2),
            "Springfield",
            null,
            "Doctor",
            "Hospital",
            null,
            4000,
            600,
            "jane.doe@example.com",
            "0987654321",
            null);
    locataire2.setIdLocataire(2);
    List<Personne> garants = Arrays.asList(locataire2);
    LocalDate dateContrat = LocalDate.now();
    Adresse lieuDeContrat = new Adresse("123", "Main St", "Springfield", "12345");
    float caution = 500;

    Location location = new Location(locataire, garants, dateContrat, lieuDeContrat, caution);

    assertEquals(dateContrat, location.getDateContrat());
    assertEquals(lieuDeContrat, location.getLieuDeContrat());
    assertEquals(1, location.getLocataires().size());
    assertEquals(locataire, location.getLocataires().get(0));
    assertEquals(garants, location.getGarants());
    assertEquals(caution, location.getCaution(), 0.01);
  }

  @Test
  public void testAddGarant() {
    Personne locataire =
        new Personne(
            "Doe",
            "John",
            5,
            LocalDate.of(1990, 1, 1),
            "Springfield",
            null,
            "Engineer",
            "Company",
            null,
            3000,
            500,
            "john.doe@example.com",
            "1234567890",
            null);
    locataire.setIdLocataire(1);
    List<Personne> garants = new LinkedList<>();
    LocalDate dateContrat = LocalDate.now();
    Adresse lieuDeContrat = new Adresse("123", "Main St", "Springfield", "12345");
    float caution = 500;

    Location location = new Location(locataire, garants, dateContrat, lieuDeContrat, caution);
    Personne newGarant =
        new Personne(
            "Doe",
            "Jane",
            6,
            LocalDate.of(1992, 2, 2),
            "Springfield",
            null,
            "Doctor",
            "Hospital",
            null,
            4000,
            600,
            "jane.doe@example.com",
            "0987654321",
            null);
    newGarant.setIdLocataire(2);
    location.addGarant(newGarant);

    assertEquals(1, location.getGarants().size());
    assertEquals(newGarant, location.getGarants().get(0));
  }

  @Test
  public void testTotalRevenusLocataires() {
    Personne locataire =
        new Personne(
            "Doe",
            "John",
            7,
            LocalDate.of(1990, 1, 1),
            "Springfield",
            null,
            "Engineer",
            "Company",
            null,
            3000,
            500,
            "john.doe@example.com",
            "1234567890",
            null);
    locataire.setIdLocataire(1);

    Personne garant =
        new Personne(
            "Doe",
            "Jane",
            8,
            LocalDate.of(1992, 2, 2),
            "Springfield",
            null,
            "Doctor",
            "Hospital",
            null,
            4000,
            600,
            "jane.doe@example.com",
            "0987654321",
            null);
    garant.setIdLocataire(2);
    List<Personne> garants = Arrays.asList();
    LocalDate dateContrat = LocalDate.now();
    Adresse lieuDeContrat = new Adresse("123", "Main St", "Springfield", "12345");
    float caution = 500;

    Location location = new Location(locataire, garants, dateContrat, lieuDeContrat, caution);

    assertEquals(0, location.TotalRevenusLocataires(), 0.0F);
  }
}
