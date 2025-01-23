import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotSame;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class CloneTest {

	@Test
	public void testCloneObjetGraphique() throws CloneNotSupportedException {
		ObjetGraphique o1 = new ObjetGraphique(0, 0);
		Object o2 = o1.clone();
		assertNotSame(o1, o2);
		assertNotEquals(o1, o2);
		assertTrue(o1.equals(o2));
	}

	@Test
	public void testCloneArbre() throws CloneNotSupportedException {
		Arbre o1 = new Arbre(0, 0, 0, "marron", "vert");
		Object o2 = o1.clone();
		assertNotSame(o1, o2);
		assertNotEquals(o1, o2);
		assertTrue(o1.equals(o2));
	}

	@Test
	public void testCloneImmeuble() throws CloneNotSupportedException {
		Immeuble o1 = new Immeuble(0, 0, "gris", 14, 2);
		Object o2 = o1.clone();
		assertNotSame(o1, o2);
		assertNotEquals(o1, o2);
		assertTrue(o1.equals(o2));
	}

}
