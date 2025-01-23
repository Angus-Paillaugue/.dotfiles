import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import org.junit.Test;
import java.util.ArrayList;
import java.util.List;

package modele;

public class BienLouableTests {

	@Test
	public void testBienLouableConstructor() {
		Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
		Loyer loyer = new Loyer(1000);
		Charges charges = new Charges(200);
		BienLouable bienLouable = new BienLouableImpl(adresse, "RC123", true, 500, "NF123", 300, loyer, charges);

		assertEquals(adresse, bienLouable.getAdresse());
		assertEquals("RC123", bienLouable.getRefCadastrale());
		assertTrue(bienLouable.isBati());
		assertEquals(500, bienLouable.getMontantDepotGarantie(), 0.01);
		assertEquals("NF123", bienLouable.getNumeroFiscal());
		assertEquals(300, bienLouable.getTaxeFonciere(), 0.01);
		assertEquals(loyer, bienLouable.getLoyer());
		assertEquals(charges, bienLouable.getCharges());
		assertNotNull(bienLouable.getTravaux());
		assertNotNull(bienLouable.getAssurance());
	}

	@Test
	public void testTotalCoutAssurance() {
		Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
		Loyer loyer = new Loyer(1000);
		Charges charges = new Charges(200);
		BienLouable bienLouable = new BienLouableImpl(adresse, "RC123", true, 500, "NF123", 300, loyer, charges);

		Assurance assurance1 = new Assurance(100);
		Assurance assurance2 = new Assurance(200);
		List<Assurance> assurances = new ArrayList<>();
		assurances.add(assurance1);
		assurances.add(assurance2);

		bienLouable.getAssurance().addAll(assurances);

		assertEquals(300, bienLouable.totalCoutAssurance(), 0.01);
	}

	@Test
	public void testLoyerCC() {
		Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
		Loyer loyer = new Loyer(1000);
		Charges charges = new Charges(200);
		BienLouable bienLouable = new BienLouableImpl(adresse, "RC123", true, 500, "NF123", 300, loyer, charges);

		assertEquals(1200, bienLouable.loyerCC(), 0.01);
	}

	private class BienLouableImpl extends BienLouable {
		public BienLouableImpl(Adresse adresse, String refCadastrale, boolean bati, float montantDepotGarantie,
				String numeroFiscal, float taxeFonciere, Loyer loyer, Charges charges) {
			super(adresse, refCadastrale, bati, montantDepotGarantie, numeroFiscal, taxeFonciere, loyer, charges);
		}

		@Override
		public float surfaceTotale() {
			return 100;
		}
	}
}
