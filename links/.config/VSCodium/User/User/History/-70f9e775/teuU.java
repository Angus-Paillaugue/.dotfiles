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
  public void testTwoPersonConstructor() {
    Personne locataire1 =
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
    Personne locataire2 =
        new Personne(
            "Smith",
            "Jane",
            2,
            LocalDate.of(1993, 3, 3),
            "Springfield",
            null,
            "Teacher",
            "School",
            null,
            3500,
            400,
            "jane.smith@example.com",
            "1122334455",
            null);

    Personne locataire3 =
        new Personne(
            "Doe",
            "Jane",
            3,
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
    List<Personne> garants = Arrays.asList(locataire3);
    LocalDate dateContrat = LocalDate.now();
    Adresse lieuDeContrat = new Adresse("123", "Main St", "Springfield", "12345");
    float caution = 500;

    Location location =
        new Location(locataire1, locataire2, garants, dateContrat, lieuDeContrat, caution);

    assertEquals(dateContrat, location.getDateContrat());
    assertEquals(lieuDeContrat, location.getLieuDeContrat());
    assertEquals(2, location.getLocataires().size());
    assertEquals(locataire1, location.getLocataires().get(0));
    assertEquals(locataire2, location.getLocataires().get(1));
    assertEquals(garants, location.getGarants());
    assertEquals(caution, location.getCaution(), 0.01);
  }

  @Test
  public void testAddGarant() {
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
    List<Personne> garants = new ArrayList<>();
    LocalDate dateContrat = LocalDate.now();
    Adresse lieuDeContrat = new Adresse("123", "Main St", "Springfield", "12345");
    float caution = 500;

    Location location = new Location(locataire, garants, dateContrat, lieuDeContrat, caution);
    Personne newGarant =
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

    List<Personne> garants = Arrays.asList();
    LocalDate dateContrat = LocalDate.now();
    Adresse lieuDeContrat = new Adresse("123", "Main St", "Springfield", "12345");
    float caution = 500;

    Location location = new Location(locataire, garants, dateContrat, lieuDeContrat, caution);

    assertEquals(0, location.TotalRevenusLocataires(), 0.0F);
  }
}
