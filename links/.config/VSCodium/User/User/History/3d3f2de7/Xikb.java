import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.Test;

import modele.Prime;
import modele.typeContratAssurance;

public class PrimeTests {

	private Prime prime;

	@Before
	public void setUp() {
		prime = new Prime(
				typeContratAssurance.JURISPRUDENCE,
				"AssureurX",
				12345,
				10.0f,
				500.0f);
	}

	@Test
	public void testGetPrime() {
		assertEquals(500.0f, prime.getPrime(), 0.0f);
	}

	@Test
	public void testCout() {
		assertEquals(500.0f, prime.cout(), 0.0f);
	}
}
