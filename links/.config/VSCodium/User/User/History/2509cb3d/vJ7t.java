
import static org.junit.Assert.*;
import org.junit.Test;
import java.util.List;
import java.time.LocalDate;
import java.util.ArrayList;

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
		Charges charges = new Charges(100, 50, 30, 20, 200, 2, 50, 100);
		Garage garage = new Garage(adresse, "RC123", true, 500, "NF123", 300, loyer, charges);

		assertEquals(adresse, garage.getAdresse());
		assertEquals("RC123", garage.getRefCadastrale());
		assertTrue(garage.isBati());
		assertEquals(500, garage.getMontantDepotGarantie(), 0.01);
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
		Charges charges = new Charges(100, 50, 30, 20, 200, 2, 50, 100);
		Garage garage = new Garage(adresse, "RC123", true, 500, "NF123", 300, loyer, charges);

		Piece piece = new Piece("");
		garage.addPiece(piece);

		assertEquals(1, garage.getPiece().size());
		assertEquals(piece, garage.getPiece().get(0));
	}

	@Test
	public void testSurfaceTotale() {
		Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
		Loyer loyer = new Loyer(1000, 1, LocalDate.now(), LocalDate.now().plusYears(1), ModeDePaiment.CHEQUE);
		Charges charges = new Charges(100, 50, 30, 20, 200, 2, 50, 100);
		Garage garage = new Garage(adresse, "RC123", true, 500, "NF123", 300, loyer, charges);

		Piece piece1 = new Piece(20);
		Piece piece2 = new Piece(30);
		garage.addPiece(piece1);
		garage.addPiece(piece2);

		assertEquals(50, garage.surfaceTotale(), 0.01);
	}
}
