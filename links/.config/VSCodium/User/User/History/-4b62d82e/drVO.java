import org.junit.Test;
import static org.junit.Assert.*;

public class CloneTest {

	@Test
	public void test() throws CloneNotSupportedException {
		ObjetGraphique a1 = new ObjetGraphique(0, 0);
        System.out.println(a1);
		assertNotSame(a1, a1.clone());
	}

}
