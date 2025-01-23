import org.junit.Test;
import static org.junit.Assert.*;

public class CloneTest {

	@Test
	public void testCloneObjetGraphique() {
		ObjetGraphique a1 = new ObjetGraphique(0, 0);
		assertNotSame(a1, a1.clone());
	}

    @Test
    public void testCloneArbre() {
        Arbre a1 = new Arbre(0, 0, 0, "marron", "vert");
        assertNotSame(a1, a1.clone());
    }

}
