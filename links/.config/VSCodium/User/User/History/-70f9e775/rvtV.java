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
		Personne locataire = new Personne("John Doe");
		List<Personne> garants = Arrays.asList(new Personne("Jane Doe"));
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
		Personne locataire1 = new Personne("John Doe");
		Personne locataire2 = new Personne("Jane Smith");
		List<Personne> garants = Arrays.asList(new Personne("Jane Doe"));
		LocalDate dateContrat = LocalDate.now();
		Adresse lieuDeContrat = new Adresse("123", "Main St", "Springfield", "12345");
		float caution = 500;

		Location location = new Location(locataire1, locataire2, garants, dateContrat, lieuDeContrat, caution);

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
		Personne locataire = new Personne("John Doe");
		List<Personne> garants = new ArrayList<>();
		LocalDate dateContrat = LocalDate.now();
		Adresse lieuDeContrat = new Adresse("123", "Main St", "Springfield", "12345");
		float caution = 500;

		Location location = new Location(locataire, garants, dateContrat, lieuDeContrat, caution);
		Personne newGarant = new Personne("Jane Doe");
		location.addGarant(newGarant);

		assertEquals(1, location.getGarants().size());
		assertEquals(newGarant, location.getGarants().get(0));
	}

	@Test
	public void testTotalRevenusLocataires() {
		Personne locataire = new Personne("John Doe");
		List<Personne> garants = Arrays.asList(new Personne("Jane Doe", 3000));
		LocalDate dateContrat = LocalDate.now();
		Adresse lieuDeContrat = new Adresse("123", "Main St", "Springfield", "12345");
		float caution = 500;

		Location location = new Location(locataire, garants, dateContrat, lieuDeContrat, caution);

		assertEquals(3000, location.TotalRevenusLocataires(), 0.01);
	}
}
