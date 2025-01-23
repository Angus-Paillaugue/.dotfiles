import static org.junit.Assert.*;
import org.junit.Test;

import modele.Charges;

public class ChargesTests {

  @Test
  public void testChargesConstructor() {
    Charges charges = new Charges(100, 50, 30, 20, 200, 2, 50, 100);

    assertEquals(100, charges.getProvisionSurCharge(), 0.01);
  }

  @Test
  public void testTotalEau() {
    Charges charges = new Charges(100, 50, 30, 20, 200, 2, 50, 100);

    assertEquals(300, charges.totalEau(), 0.01);
  }

  @Test
  public void testTotalCharges() {
    Charges charges = new Charges(100, 50, 30, 20, 200, 2, 50, 100);

    assertEquals(400, charges.totalCharges(), 0.01);
  }

  @Test
  public void testProvisionSurChargeAnnuel() {
    Charges charges = new Charges(100, 50, 30, 20, 200, 2, 50, 100);

    assertEquals(1200, charges.provisionSurChargeAnnuel(), 0.01);
  }

  @Test
  public void testPropositionNouvelleProvisionSurCharge() {
    Charges charges = new Charges(100, 50, 30, 20, 200, 2, 50, 100);

    assertEquals(700, charges.propositionNouvelleProvisionSurCharge(), 0.01);
  }

  @Test
  public void testRestantDu() {
    Charges charges = new Charges(100, 50, 30, 20, 200, 2, 50, 100);

    assertEquals(3600, charges.restantDu(), 0.01);
  }

  @Test
  public void testEauPartieVariable() {
    Charges charges = new Charges(100, 50, 30, 20, 200, 2, 50, 100);

    assertEquals(100, charges.eauPartieVariable(), 0.01);
  }

  @Test
  public void testEauConsommation() {
    Charges charges = new Charges(100, 50, 30, 20, 200, 2, 50, 100);

    assertEquals(50, charges.eauConsommation(), 0.01);
  }

  @Test
  public void testSetNouvelIndexEau() {
    Charges charges = new Charges(100, 50, 30, 20, 200, 2, 50, 100);
    charges.setNouvelIndexEau(150);

    assertEquals(50, charges.eauConsommation(), 0.01);
  }
}
