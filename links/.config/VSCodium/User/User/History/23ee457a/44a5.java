import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import org.junit.Before;
import org.junit.Test;

import modele.Proprietaire;
import modele.Adresse;

public class ProprietaireTestsTest {

	private Proprietaire proprietaire;

	@Before
	public void setUp() {
		proprietaire = new Proprietaire(
				"Smith",
				"John",
				new Adresse("456 Elm St", "Lyon", "69000", "France"),
				"john.smith@examplecom",
				"1234567890"
			);
	}

	@Test
	public void testGetNom() {
		assertEquals("Smith", proprietaire.getNom());
	}

	@Test
	public void testGetPrenom() {
		assertEquals("John", proprietaire.getPrenom());
	}

	@Test
	public void testGetEmail() {
		assertEquals("john.smith@example.com", proprietaire.getMail());
	}

	@Test
	public void testGetTelephone() {
		assertEquals("1234567890", proprietaire.getTelephone());
	}

	@Test
	public void testGetAdresse() {
		Adresse adresse = proprietaire.getAdresse();
		assertNotNull(adresse);
		assertEquals("456 Elm St", adresse.getRue());
		assertEquals("Lyon", adresse.getVille());
		assertEquals("69000", adresse.getCp());
		assertEquals("456", adresse.getNumero());
	}
}
