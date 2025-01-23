import static org.junit.Assert.*;
import org.junit.Test;
import java.time.LocalDate;
import java.util.*;
import modele.Location;

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

	private class Personne {
		private String name;
		private float revenus;

		public Personne(String name) {
			this.name = name;
		}

		public Personne(String name, float revenus) {
			this.name = name;
			this.revenus = revenus;
		}

		public float totalRevenus() {
			return this.revenus;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null || getClass() != obj.getClass())
				return false;
			Personne personne = (Personne) obj;
			return Objects.equals(name, personne.name);
		}

		@Override
		public int hashCode() {
			return Objects.hash(name);
		}

		@Override
		public String toString() {
			return name;
		}
	}

	private class Adresse {
		private String numero;
		private String rue;
		private String ville;
		private String cp;

		public Adresse(String numero, String rue, String ville, String cp) {
			this.numero = numero;
			this.rue = rue;
			this.ville = ville;
			this.cp = cp;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null || getClass() != obj.getClass())
				return false;
			Adresse adresse = (Adresse) obj;
			return Objects.equals(numero, adresse.numero) &&
					Objects.equals(rue, adresse.rue) &&
					Objects.equals(ville, adresse.ville) &&
					Objects.equals(cp, adresse.cp);
		}

		@Override
		public int hashCode() {
			return Objects.hash(numero, rue, ville, cp);
		}

		@Override
		public String toString() {
			return numero + " " + rue + ", " + ville + " " + cp;
		}
	}
}
