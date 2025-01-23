import static org.junit.Assert.*;
import org.junit.Test;
import java.time.LocalDate;

import modele.Adresse;
import modele.Charges;
import modele.Garage;
import modele.Loyer;
import modele.ModeDePaiment;
import modele.Piece;

public class GarageTests {

	@Test
	public void testGarageConstructor() {
		Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
		Loyer loyer = new Loyer(1000, 1, LocalDate.now(), LocalDate.now().plusYears(1), ModeDePaiment.CHEQUE);
		Charges charges = new Charges(50, 30, 20, 200, 100);
		Garage garage = new Garage(adresse, "RC123", true, "NF123", 300, loyer, charges);

		assertEquals(adresse, garage.getAdresse());
		assertEquals("RC123", garage.getRefCadastrale());
		assertTrue(garage.isBati());
		assertEquals("NF123", garage.getNumeroFiscal());
		assertEquals(300, garage.getTaxeFonciere(), 0.01);
		assertEquals(loyer, garage.getLoyer());
		assertEquals(charges, garage.getCharges());
		assertNotNull(garage.getPiece());
	}

	@Test
	public void testAddPiece() {
		Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
		Loyer loyer = new Loyer(1000, 1, LocalDate.now(), LocalDate.now().plusYears(1), ModeDePaiment.CHEQUE);
		Charges charges = new Charges(50, 30, 20, 200, 100);
		Garage garage = new Garage(adresse, "RC123", true, "NF123", 300, loyer, charges);

		Piece piece = new Piece("piece", 0, 20, 0);
		garage.addPiece(piece);

		assertEquals(1, garage.getPiece().size());
		assertEquals(piece, garage.getPiece().get(0));
	}

	@Test
	public void testSurfaceTotale() {
		Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
		Loyer loyer = new Loyer(1000, 1, LocalDate.now(), LocalDate.now().plusYears(1), ModeDePaiment.CHEQUE);
		Charges charges = new Charges(50, 30, 20, 200, 100);
		Garage garage = new Garage(adresse, "RC123", true, "NF123", 300, loyer, charges);

		Piece piece1 = new Piece("piece", 0, 20, 0);
		Piece piece2 = new Piece("piece", 0, 20, 0);
		garage.addPiece(piece1);
		garage.addPiece(piece2);

		assertEquals(40, garage.surfaceTotale(), 0.01);
	}
}
