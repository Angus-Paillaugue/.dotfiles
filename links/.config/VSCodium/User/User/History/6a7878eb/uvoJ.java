import static org.junit.Assert.*;
import org.junit.Test;
import java.time.LocalDate;
import modele.Loyer;
import modele.ModeDePaiment;

public class LoyerTests {

  @Test
  public void testLoyerConstructor() {
    float montantHorsCharge = 1000;
    int jourVersement = 1;
    LocalDate dateDerniereRevision = LocalDate.of(2022, 1, 1);
    LocalDate dateProchaineRevision = LocalDate.of(2023, 1, 1);
    ModeDePaiment modeDePaiment = ModeDePaiment.CB;

    Loyer loyer =
        new Loyer(
            montantHorsCharge,
            jourVersement,
            dateDerniereRevision,
            dateProchaineRevision,
            modeDePaiment);

    assertEquals(montantHorsCharge, loyer.getMontantHorsCharge(), 0.01);
    assertEquals(jourVersement, loyer.getJourVersement());
    assertEquals(dateDerniereRevision, loyer.getDateDerniereRevision());
    assertEquals(dateProchaineRevision, loyer.getDateProchaineRevision());
    assertEquals(modeDePaiment, loyer.getModeDePaiment());
  }

  @Test
  public void testSetMontantHorsCharge() {
    Loyer loyer =
        new Loyer(1000, 1, LocalDate.of(2022, 1, 1), LocalDate.of(2023, 1, 1), ModeDePaiment.CB);
    loyer.setMontantHorsCharge(1200);

    assertEquals(1200, loyer.getMontantHorsCharge(), 0.01);
  }

  @Test
  public void testSetDateVersement() {
    Loyer loyer =
        new Loyer(1000, 1, LocalDate.of(2022, 1, 1), LocalDate.of(2023, 1, 1), ModeDePaiment.CB);
    loyer.setDateVersement(5);

    assertEquals(5, loyer.getJourVersement());
  }

  @Test
  public void testSetDateDerniereRevision() {
    Loyer loyer =
        new Loyer(1000, 1, LocalDate.of(2022, 1, 1), LocalDate.of(2023, 1, 1), ModeDePaiment.CB);
    LocalDate newDate = LocalDate.of(2022, 6, 1);
    loyer.setDateDerniereRevision(newDate);

    assertEquals(newDate, loyer.getDateDerniereRevision());
  }

  @Test
  public void testSetDateProchaineRevision() {
    Loyer loyer =
        new Loyer(1000, 1, LocalDate.of(2022, 1, 1), LocalDate.of(2023, 1, 1), ModeDePaiment.CB);
    LocalDate newDate = LocalDate.of(2023, 6, 1);
    loyer.setDateProchaineRevision(newDate);

    assertEquals(newDate, loyer.getDateProchaineRevision());
  }

  @Test
  public void testSetModeDePaiment() {
    Loyer loyer =
        new Loyer(1000, 1, LocalDate.of(2022, 1, 1), LocalDate.of(2023, 1, 1), ModeDePaiment.CB);
    ModeDePaiment newMode = ModeDePaiment.CHEQUE;
    loyer.setModeDePaiment(newMode);

    assertEquals(newMode, loyer.getModeDePaiment());
  }
}
