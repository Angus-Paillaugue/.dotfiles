import static org.junit.Assert.*;

import java.time.LocalDate;

import org.junit.Test;

import modele.Charges;

public class ChargesTests {

  @Test
  public void testChargesConstructor() {
    Charges charges = new Charges(100, 50, 30, 20, 200, 2, 2, LocalDate.now());

    assertEquals(200, charges.getProvisionSurCharge(), 0.01);
  }

  @Test
  public void testOrduresMenageres() {
    Charges charges = new Charges(100, 50, 30, 20, 200, 2, 2, LocalDate.now());

    assertEquals(100, charges.getOrduresMenageres(), 0.01);
  }

  @Test
  public void testEntretienPartiesCommunes() {
    Charges charges = new Charges(100, 50, 30, 20, 200, 2, 2, LocalDate.now());

    assertEquals(50, charges.getEntretienPartiesCommunes(), 0.01);
  }

  @Test
  public void testEclairagePartiesCommunes() {
    Charges charges = new Charges(100, 50, 30, 20, 200, 2, 2, LocalDate.now());

    assertEquals(30, charges.getEclairagePartiesCommunes(), 0.01);
  }

  @Test
  public void testRestantDu() {
    Charges charges = new Charges(100, 50, 30, 20, 200, 2, 2, LocalDate.now());

    assertEquals(20, charges.getEauPartieFixe(), 0.01);
  }

  @Test
  public void testEauPartieFixe() {
    Charges charges = new Charges(100, 50, 30, 20, 200, 2, 2, LocalDate.now());

    assertEquals(200, charges.getProvisionSurCharge(), 0.01);
  }
}
