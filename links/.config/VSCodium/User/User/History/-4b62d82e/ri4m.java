import org.junit.Test;
import static org.junit.Assert.*;

public class CloneTest {

	@Test
	public void testCloneObjetGraphique() throws CloneNotSupportedException {
		ObjetGraphique a1 = new ObjetGraphique(0, 0);
        Object a2 = a1.clone();
		assertNotSame(a1, a2);
        assertNotEquals(a1, a2);
	}

    @Test
    public void testCloneArbre() throws CloneNotSupportedException {
        Arbre a1 = new Arbre(0, 0, 0, "marron", "vert");
        Object a2 = a1.clone();
        assertNotSame(a1, a2);
        assertNotEquals(a1, a2);
    }

    @Test
    public void testCloneImmeuble() throws CloneNotSupportedException {
        Immeuble a1 = new Immeuble(0, 0, "gris", 14, 2);
        Object a2 = a1.clone();
        assertNotSame(a1, a2);
        assertNotEquals(a1, a2);
    }

}
