import org.junit.Test;
import static org.junit.Assert.*;

public class CloneTest {

	@Test
	public void testCloneObjetGraphique() throws CloneNotSupportedException {
		ObjetGraphique a1 = new ObjetGraphique(0, 0);
		assertNotSame(a1, a1.clone());
	}

    @Test
    public void testCloneArbre() throws CloneNotSupportedException {
        Arbre a1 = new Arbre(0, 0, 0, "marron", "vert");
        assertNotSame(a1, a1.clone());
    }

    @Test
    public void testCloneImmeuble() throws CloneNotSupportedException {
        Immeuble a1 = new Immeuble(0, 0, "gris", 14, 2);
        assertNotSame(a1, a1.clone());
    }

}
