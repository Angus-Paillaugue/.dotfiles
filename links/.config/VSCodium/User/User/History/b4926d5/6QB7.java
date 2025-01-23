import static org.junit.Assert.*;
import org.junit.Test;
import java.time.LocalDate;
import modele.*;

public class LogementTests {

  @Test
  public void testLogementConstructor() {
    Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
    Loyer loyer =
        new Loyer(1000, 1, LocalDate.now(), LocalDate.now().plusYears(1), ModeDePaiment.VIREMENT);
    Charges charges = new Charges(100, 50, 30, 20, 200);
    Logement logement =
        new Logement(
            adresse,
            10,
                10,
            "RC123",
            true,
            "NF123",
            300,
            loyer,
            charges,
            LocalDate.of(2000, 1, 1),
            LocalDate.of(2001, 1, 1),
            "No",
            "No",
            "Yes",
            noteEnergetique.A,
            noteEnergetique.B,
            "REF123",
            true,
            "Fiber");

    assertEquals(adresse, logement.getAdresse());
    assertEquals("RC123", logement.getRefCadastrale());
    assertTrue(logement.isBati());
    assertEquals("NF123", logement.getNumeroFiscal());
    assertEquals(300, logement.getTaxeFonciere(), 0.01);
    assertEquals(loyer, logement.getLoyer());
    assertEquals(charges, logement.getCharges());
    assertEquals(LocalDate.of(2000, 1, 1), logement.getDatePermisConstruction());
    assertEquals(LocalDate.of(2001, 1, 1), logement.getDateConstruction());
    assertEquals("No", logement.getConstatAmiante());
    assertEquals("No", logement.getConstatPlomb());
    assertEquals("Yes", logement.getConstatElectricite());
    assertEquals(noteEnergetique.A, logement.getConstatEnergetique());
    assertEquals(noteEnergetique.B, logement.getEmissionGazEffetDeSerre());
    assertEquals("REF123", logement.getReferenceLogement());
    assertTrue(logement.isMeuble());
    assertEquals("Fiber", logement.getEquipementAccesTechnologie());
    assertNotNull(logement.getElementEquipementLogement());
    assertNotNull(logement.getGarage());
  }

  @Test
  public void testSurfaceTotale() {
    Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
    Loyer loyer =
        new Loyer(1000, 1, LocalDate.now(), LocalDate.now().plusYears(1), ModeDePaiment.VIREMENT);
    Charges charges = new Charges(100, 50, 30, 20, 200);
    Logement logement =
        new Logement(
            adresse,
            10,
                10,
            "RC123",
            true,
            "NF123",
            300,
            loyer,
            charges,
            LocalDate.of(2000, 1, 1),
            LocalDate.of(2001, 1, 1),
            "No",
            "No",
            "Yes",
            noteEnergetique.A,
            noteEnergetique.B,
            "REF123",
            true,
            "Fiber");

    logement.setSurfaceTotale(150.5f);
    assertEquals(150.5f, logement.getSurfaceTotale(), 0.01);
  }

  @Test
  public void testAddElementEquipementLogement() {
    Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
    Loyer loyer =
        new Loyer(1000, 1, LocalDate.now(), LocalDate.now().plusYears(1), ModeDePaiment.VIREMENT);
    Charges charges = new Charges(100, 50, 30, 20, 200);
    Logement logement =
        new Logement(
            adresse,
            10,
                10,
            "RC123",
            true,
            "NF123",
            300,
            loyer,
            charges,
            LocalDate.of(2000, 1, 1),
            LocalDate.of(2001, 1, 1),
            "No",
            "No",
            "Yes",
            noteEnergetique.A,
            noteEnergetique.B,
            "REF123",
            true,
            "Fiber");

    ElementEquipementLogement equipement = ElementEquipementLogement.CLIMATISATION;
    logement.getElementEquipementLogement().add(equipement);

    assertEquals(1, logement.getElementEquipementLogement().size());
    assertEquals(equipement, logement.getElementEquipementLogement().get(0));
  }

  @Test
  public void testAddGarage() {
    Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
    Loyer loyer =
        new Loyer(1000, 1, LocalDate.now(), LocalDate.now().plusYears(1), ModeDePaiment.VIREMENT);
    Charges charges = new Charges(100, 50, 30, 20, 200);
    Logement logement =
        new Logement(
            adresse,
            10,
                10,
            "RC123",
            true,
            "NF123",
            300,
            loyer,
            charges,
            LocalDate.of(2000, 1, 1),
            LocalDate.of(2001, 1, 1),
            "No",
            "No",
            "Yes",
            noteEnergetique.A,
            noteEnergetique.B,
            "REF123",
            true,
            "Fiber");

    Garage garage = new Garage(adresse, 10, 10, "RC124", true, "NF124", 100, loyer, charges);
    logement.getGarage().add(garage);

    assertEquals(1, logement.getGarage().size());
    assertEquals(garage, logement.getGarage().get(0));
  }
}
