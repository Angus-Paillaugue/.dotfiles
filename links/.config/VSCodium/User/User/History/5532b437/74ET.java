import static org.junit.Assert.*;
import org.junit.Test;
import java.util.*;

public class ColocationTests {

	@Test
	public void testAddColoc() {
		Colocation colocation = new Colocation();
		Personne colocataire = new Personne("John Doe");
		List<Personne> garants = Arrays.asList(new Personne("Jane Doe"));
		Date dateContrat = new Date();
		int duree = 12;
		String lieuDeContrat = "Paris";

		colocation.addColoc(colocataire, garants, dateContrat, duree, lieuDeContrat);

		assertEquals(1, colocation.getColocataires().size());
		assertEquals(garants, colocation.getGarants(colocataire));
		assertEquals(dateContrat, colocation.getDateContrat(colocataire));
		assertEquals(duree, colocation.getDuree(colocataire));
		assertEquals(lieuDeContrat, colocation.getLieuDeContrat(colocataire));
	}

	@Test
	public void testDelColoc() {
		Colocation colocation = new Colocation();
		Personne colocataire = new Personne("John Doe");
		List<Personne> garants = Arrays.asList(new Personne("Jane Doe"));
		Date dateContrat = new Date();
		int duree = 12;
		String lieuDeContrat = "Paris";

		colocation.addColoc(colocataire, garants, dateContrat, duree, lieuDeContrat);
		colocation.delColoc(colocataire);

		assertEquals(0, colocation.getColocataires().size());
	}

	@Test
	public void testGetColocataire() {
		Colocation colocation = new Colocation();
		Personne colocataire = new Personne("John Doe");
		List<Personne> garants = Arrays.asList(new Personne("Jane Doe"));
		Date dateContrat = new Date();
		int duree = 12;
		String lieuDeContrat = "Paris";

		colocation.addColoc(colocataire, garants, dateContrat, duree, lieuDeContrat);

		List<Object> informations = colocation.getColocataire(colocataire);
		assertEquals(garants, informations.get(0));
		assertEquals(dateContrat, informations.get(1));
		assertEquals(duree, informations.get(2));
		assertEquals(lieuDeContrat, informations.get(3));
	}

	private class Personne {
		private String name;

		public Personne(String name) {
			this.name = name;
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
}
