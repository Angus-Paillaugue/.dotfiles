package modele;

import static org.junit.Assert.*;
import org.junit.Test;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class BienLouableTests {

	@Test
	public void testBienLouableConstructor() {
		Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
		Loyer loyer = new Loyer(1000, 1, LocalDate.now(), LocalDate.now().plusYears(1), ModeDePaiment.VIREMENT);
		Charges charges = new Charges(100, 50, 30, 20, 200, 2, 50, 100);
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
		Loyer loyer = new Loyer(1000, 1, LocalDate.now(), LocalDate.now().plusYears(1), ModeDePaiment.VIREMENT);
		Charges charges = new Charges(100, 50, 30, 20, 200, 2, 50, 100);
		BienLouable bienLouable = new BienLouableImpl(adresse, "RC123", true, 500, "NF123", 300, loyer, charges);

		Assurance assurance1 = new AssuranceImpl(typeContratAssurance.JURISPRUDENCE, "Assureur1", 123, 100);
		Assurance assurance2 = new AssuranceImpl(typeContratAssurance.JURISPRUDENCE, "Assureur2", 456, 200);
		List<Assurance> assurances = new ArrayList<>();
		assurances.add(assurance1);
		assurances.add(assurance2);

		bienLouable.getAssurance().addAll(assurances);

		assertEquals(300, bienLouable.totalCoutAssurance(), 0.01);
	}

	@Test
	public void testLoyerCC() {
		Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
		Loyer loyer = new Loyer(1000, 1, LocalDate.now(), LocalDate.now().plusYears(1), ModeDePaiment.VIREMENT);
		Charges charges = new Charges(100, 50, 30, 20, 200, 2, 50, 100);
		BienLouable bienLouable = new BienLouableImpl(adresse, "RC123", true, 500, "NF123", 300, loyer, charges);

		assertEquals(1100, bienLouable.loyerCC(), 0.01);
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

	private class AssuranceImpl extends Assurance {
		public AssuranceImpl(typeContratAssurance typeContrat, String nomAssureur, int numeroContrat, float augmentation) {
			super(typeContrat, nomAssureur, numeroContrat, augmentation);
		}

		@Override
		public float cout() {
			return getAugmentation();
		}
	}
}
