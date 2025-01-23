import static org.junit.Assert.*;
import org.junit.Test;
import java.util.*;
import modele.Personne;
import vues.Constants;
import modele.Colocation;

public class ColocationTests {

	@Test
	public void testAddColoc() {
		Colocation colocation = new Colocation();
		Personne colocataire = Constants.locataire1;
		List<Personne> garants = Arrays.asList(Constants.garant1);
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
		Personne colocataire = Constants.locataire1;
		List<Personne> garants = Arrays.asList(Constants.garant1);
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
		Personne colocataire = Constants.locataire1;
		List<Personne> garants = Arrays.asList(Constants.garant1);
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
}
