import org.junit.Test;
import static org.junit.Assert.*;

public class CloneTest {

	@Test
	public void test() throws CloneNotSupportedException {
		Arbre a1 = new Arbre(0, 0, 10, "Rouge", "Vert");
		assertSame(a1, a1);
	}

}
