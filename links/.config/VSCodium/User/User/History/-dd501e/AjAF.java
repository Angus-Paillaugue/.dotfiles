import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import java.time.LocalDate;
import org.junit.Before;
import org.junit.Test;

import modele.SituationFamiliale;
import modele.Personne;
import modele.TypeDeContratDeTravail;
import modele.Adresse;

public class PersonneTests {

	private Personne personne;

	@Before
	public void setUp() {
		personne = new Personne(
				"Doe",
				"John",
				1,
				LocalDate.of(1990, 1, 1),
				"Paris",
				SituationFamiliale.CELIBATAIRE,
				"Developer",
				"TechCorp",
				TypeDeContratDeTravail.CDI,
				3000.0f,
				500.0f,
				"john.doe@example.com",
				"1234567890",
				new Adresse("123", "Main St", "Paris", "75000"));
	}

	@Test
	public void testGetNom() {
		assertEquals("Doe", personne.getNom());
	}

	@Test
	public void testGetPrenom() {
		assertEquals("John", personne.getPrenom());
	}

	@Test
	public void testGetIdLocataire() {
		assertEquals(1, personne.getIdLocataire());
	}

	@Test
	public void testGetDateNaissance() {
		assertEquals(LocalDate.of(1990, 1, 1), personne.getDateNaissance());
	}

	@Test
	public void testGetLieuNaissance() {
		assertEquals("Paris", personne.getLieuNaissance());
	}

	@Test
	public void testGetSituationFamiliale() {
		assertEquals(SituationFamiliale.CELIBATAIRE, personne.getSituationFamiliale());
	}

	@Test
	public void testGetProfession() {
		assertEquals("Developer", personne.getProfession());
	}

	@Test
	public void testGetEmployeur() {
		assertEquals("TechCorp", personne.getEmployeur());
	}

	@Test
	public void testGetTypeDeContratDeTravail() {
		assertEquals(TypeDeContratDeTravail.CDI, personne.getTypeDeContratDeTravail());
	}

	@Test
	public void testGetRemunerationMensuelleNette() {
		assertEquals(3000.0f, personne.getRemunerationMensuelleNette(), 0.0f);
	}

	@Test
	public void testGetAutresRevenus() {
		assertEquals(500.0f, personne.getAutresRevenus(), 0.0f);
	}

	@Test
	public void testGetEmail() {
		assertEquals("john.doe@example.com", personne.getEmail());
	}

	@Test
	public void testGetTelephone() {
		assertEquals("1234567890", personne.getTelephone());
	}

	@Test
	public void testGetAdresse() {
		Adresse adresse = personne.getAdresse();
		assertNotNull(adresse);
		assertEquals("123 Main St", adresse.getRue());
		assertEquals("Paris", adresse.getVille());
		assertEquals("75000", adresse.getCp());
		assertEquals("France", adresse.get());
	}

	@Test
	public void testTotalRevenus() {
		assertEquals(3500.0f, personne.totalRevenus(), 0.0f);
	}

	@Test
	public void testToString() {
		assertEquals("Doe John", personne.toString());
	}
}
