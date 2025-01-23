import static org.junit.Assert.*;
import org.junit.Test;

import dao.AssuranceDAO;
import modele.Assurance;
import modele.typeContratAssurance;

public class AssuranceTests {

  @Test
  public void testAssuranceConstructor() {
    Assurance assurance =
        new AssuranceImpl(typeContratAssurance.JURISPRUDENCE, "Assureur1", 123, 100);

    assertEquals(typeContratAssurance.JURISPRUDENCE, assurance.getTypeContrat());
    assertEquals("Assureur1", assurance.getNomAssureur());
    assertEquals(123, assurance.getNumeroContrat());
    assertEquals(100, assurance.getAugmentation(), 0.01);
  }

  @Test
  public void testCout() {
    Assurance assurance =
        new AssuranceImpl(typeContratAssurance.JURISPRUDENCE, "Assureur1", 123, 100);

    assertEquals(100, assurance.cout(), 0.01);
  }

  @Test
  public void testUpdate() {
    Assurance assurance =
        new Assurance("Jurisprudence", "Assureur1", 123, 100);

    new AssuranceDAO().update(assurance, -1);
  }
}
