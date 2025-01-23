import static org.junit.Assert.assertNotSame;
import org.junit.Test;

public class CloneTest {

  @Test
  public void test() {
    Arbre a1 = new Arbre(0, 0, 10, "Rouge", "Vert");
    assertNotSame(a1, a1.clone());
  }

}
