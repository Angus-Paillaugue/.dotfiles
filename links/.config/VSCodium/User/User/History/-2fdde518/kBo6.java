package modele;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import org.junit.Test;
import java.util.ArrayList;
import java.util.List;

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
		Batiment batiment = new Batiment(TypeDeBatiment.RESIDENTIEL, adresse, "NF123");

		assertEquals(TypeDeBatiment.RESIDENTIEL, batiment.getTypeBatiment());
		assertEquals(adresse, batiment.getAdresse());
		assertEquals("NF123", batiment.getNumeroFiscal());
		assertNotNull(batiment.getBiensLouables());
		assertNotNull(batiment.getTravaux());
		assertNotNull(batiment.getAssurance());
	}

	@Test
	public void testTotalCoutAssurance() {
		Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
		Batiment batiment = new Batiment(TypeDeBatiment.RESIDENTIEL, adresse);

		Assurance assurance1 = new Assurance(100);
		Assurance assurance2 = new Assurance(200);
		List<Assurance> assurances = new ArrayList<>();
		assurances.add(assurance1);
		assurances.add(assurance2);

		batiment.setAssurances(assurances);

		assertEquals(300, batiment.totalCoutAssurance(), 0.01);
	}

	@Test
	public void testToString() {
		Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
		Batiment batiment = new Batiment(TypeDeBatiment.RESIDENTIEL, adresse, "NF123");

		String expected = "Batiment [typeBatiment=RESIDENTIEL, adresse=123 Main St Springfield 12345, numeroFiscal=NF123, biensLouables=[], travaux=[], assurances=[]]";
		assertEquals(expected, batiment.toString());
	}
}
