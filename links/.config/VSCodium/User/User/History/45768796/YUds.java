import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.Test;

import modele.Piece;

public class PieceTests {

	private Piece piece;

	@Before
	public void setUp() {
		piece = new Piece("Living Room", 1, 20.0f, 5.0f);
	}

	@Test
	public void testGetDesignation() {
		assertEquals("Living Room", piece.getDesignation());
	}

	@Test
	public void testGetEtage() {
		assertEquals(1, piece.getEtage());
	}

	@Test
	public void testGetSurfaceHabitable() {
		assertEquals(20.0f, piece.getSurfaceHabitable(), 0.0f);
	}

	@Test
	public void testGetSurfaceNonHabitable() {
		assertEquals(5.0f, piece.getSurfaceNonHabitable(), 0.0f);
	}

	@Test
	public void testSurfaceTotalePiece() {
		assertEquals(25.0f, piece.surfaceTotalePiece(), 0.0f);
	}
}
