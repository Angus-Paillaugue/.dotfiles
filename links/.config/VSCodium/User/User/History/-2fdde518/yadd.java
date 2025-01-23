package modele;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import org.junit.Test;

public class BatimentTests {

	@Test
	public void testBatimentConstructorSansNumeroFiscal() {
		Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
		Batiment batiment = new Batiment(TypeDeBatiment.MAISON, adresse);

		assertEquals(TypeDeBatiment.MAISON, batiment.getTypeBatiment());
		assertEquals(adresse, batiment.getAdresse());
		assertNull(batiment.getNumeroFiscal());
		assertNotNull(batiment.getBiensLouables());
		assertNotNull(batiment.getTravaux());
		assertNotNull(batiment.getAssurance());
	}

	@Test
	public void testBatimentConstructorAvecNumeroFiscal() {
		Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
		Batiment batiment = new Batiment(TypeDeBatiment.MAISON, adresse, "NF123");

		assertEquals(TypeDeBatiment.MAISON, batiment.getTypeBatiment());
		assertEquals(adresse, batiment.getAdresse());
		assertEquals("NF123", batiment.getNumeroFiscal());
		assertNotNull(batiment.getBiensLouables());
		assertNotNull(batiment.getTravaux());
		assertNotNull(batiment.getAssurance());
	}

	@Test
	public void testToString() {
		Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
		Batiment batiment = new Batiment(TypeDeBatiment.MAISON, adresse, "NF123");

		String expected = "Batiment [typeBatiment=MAISON, adresse=123 Main St Springfield 12345, numeroFiscal=NF123, biensLouables=[], travaux=[], assurances=[]]";
		assertEquals(expected, batiment.toString());
	}
}
