import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import org.junit.Test;

import modele.Adresse;

public class AdresseTests {

  @Test
  public void testAdresseSansComplement() {
    Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
    assertEquals("123", adresse.getNumero());
    assertEquals("Main St", adresse.getRue());
    assertNull(adresse.getComplement());
    assertEquals("Springfield", adresse.getVille());
    assertEquals("12345", adresse.getCp());
  }

  @Test
  public void testAdresseAvecComplement() {
    Adresse adresse = new Adresse("123", "Main St", "Apt 4B", "Springfield", "12345");
    assertEquals("123", adresse.getNumero());
    assertEquals("Main St", adresse.getRue());
    assertEquals("Apt 4B", adresse.getComplement());
    assertEquals("Springfield", adresse.getVille());
    assertEquals("12345", adresse.getCp());
  }

  @Test
  public void testToStringSansComplement() {
    Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
    assertEquals("123 Main St Springfield 12345", adresse.toString());
  }

  @Test
  public void testToStringAvecComplement() {
    Adresse adresse = new Adresse("123", "Main St", "Apt 4B", "Springfield", "12345");
    assertEquals("123 Main St Apt 4B Springfield 12345", adresse.toString());
  }
}
#
