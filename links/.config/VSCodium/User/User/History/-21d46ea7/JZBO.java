import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import java.util.Date;
import org.junit.Before;
import org.junit.Test;

import modele.Travaux;

public class TravauxTests {

	private Travaux travaux;

	@Before
	public void setUp() {
		travaux = new Travaux(
				"F12345",
				"EntrepriseX",
				1000.0f,
				200.0f,
				50.0f,
				new Date(),
				"Renovation",
				"D67890");
	}

	@Test
	public void testGetNumeroFacture() {
		assertEquals("F12345", travaux.getNumeroFacture());
	}

	@Test
	public void testGetNomEntreprise() {
		assertEquals("EntrepriseX", travaux.getNomEntreprise());
	}

	@Test
	public void testGetMontant() {
		assertEquals(1000.0f, travaux.getMontant(), 0.0f);
	}

	@Test
	public void testGetMontantNonDeductible() {
		assertEquals(200.0f, travaux.getMontantNonDeductible(), 0.0f);
	}

	@Test
	public void testGetReduction() {
		assertEquals(50.0f, travaux.getReduction(), 0.0f);
	}

	@Test
	public void testGetDate() {
		assertNotNull(travaux.getDate());
	}

	@Test
	public void testGetNature() {
		assertEquals("Renovation", travaux.getNature());
	}

	@Test
	public void testGetNumeroDevis() {
		assertEquals("D67890", travaux.getNumeroDevis());
	}

	@Test
	public void testMontantADeclarer() {
		assertEquals(800.0f, travaux.montantADeclarer(), 0.0f);
	}
}
