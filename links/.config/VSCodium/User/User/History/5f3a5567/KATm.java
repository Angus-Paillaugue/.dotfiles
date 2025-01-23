import static org.junit.Assert.*;
import org.junit.Test;

import modele.Charges;

public class ChargesTests {

  @Test
  public void testChargesConstructor() {
    Charges charges = new Charges(50, 30, 20, 200, 100);

    assertEquals(200, charges.getProvisionSurCharge(), 0.01);
  }

  @Test
<<<<<<< HEAD
  public void testTotalEau() {
    Charges charges = new Charges(50, 30, 20, 200, 100);

    assertEquals(200, charges.totalEau(), 0.01);
  }

  @Test
  public void testTotalCharges() {
    Charges charges = new Charges(50, 30, 20, 200, 100);

    assertEquals(300, charges.totalCharges(), 0.01);
  }

  @Test
  public void testProvisionSurChargeAnnuel() {
    Charges charges = new Charges(50, 30, 20, 200, 100);

    assertEquals(1200, charges.provisionSurChargeAnnuel(), 0.01);
  }

  @Test
  public void testPropositionNouvelleProvisionSurCharge() {
    Charges charges = new Charges(50, 30, 20, 200, 100);

    assertEquals(500, charges.propositionNouvelleProvisionSurCharge(), 0.01);
=======
  public void testOrduresMenageres() {
    Charges charges = new Charges(100, 50, 30, 20, 200);

    assertEquals(100, charges.getOrduresMenageres(), 0.01);
  }

  @Test
  public void testEntretienPartiesCommunes() {
    Charges charges = new Charges(100, 50, 30, 20, 200);

    assertEquals(50, charges.getEntretienPartiesCommunes(), 0.01);
  }

  @Test
  public void testEclairagePartiesCommunes() {
    Charges charges = new Charges(100, 50, 30, 20, 200);

    assertEquals(30, charges.getEclairagePartiesCommunes(), 0.01);
>>>>>>> origin/DAO
  }

  @Test
  public void testRestantDu() {
<<<<<<< HEAD
    Charges charges = new Charges(50, 30, 20, 200, 100);

    assertEquals(2400, charges.restantDu(), 0.01);
  }

  @Test
  public void testEauPartieVariable() {
    Charges charges = new Charges(50, 30, 20, 200, 100);
    charges.setNouvelIndexEau(150);

    assertEquals(0, charges.eauPartieVariable(), 0.01); // Assuming prixEau is not set
  }

  @Test
  public void testEauConsommation() {
    Charges charges = new Charges(50, 30, 20, 200, 100);
    charges.setNouvelIndexEau(150);

    assertEquals(150, charges.eauConsommation(), 0.01); // Assuming ancienIndexEau is 0
  }

  @Test
  public void testSetNouvelIndexEau() {
    Charges charges = new Charges(50, 30, 20, 200, 100);
    charges.setNouvelIndexEau(150);

    assertEquals(150, charges.eauConsommation(), 0.01); // Assuming ancienIndexEau is 0
=======
    Charges charges = new Charges(100, 50, 30, 20, 200);

    assertEquals(20, charges.getEauPartieFixe(), 0.01);
  }

  @Test
  public void testEauPartieFixe() {
    Charges charges = new Charges(100, 50, 30, 20, 200);

    assertEquals(200, charges.getProvisionSurCharge(), 0.01);
>>>>>>> origin/DAO
  }
}
