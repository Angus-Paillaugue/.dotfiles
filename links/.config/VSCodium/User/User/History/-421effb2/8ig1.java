package DAO;

import static org.junit.Assert.assertEquals;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.LinkedList;

import org.junit.Before;
import org.junit.Test;

import dao.GarantDAO;
import dao.LocationDAO;
import jdbc.Connector;
import modele.Adresse;
import modele.Charges;
import modele.Location;
import modele.Logement;
import modele.Loyer;
import modele.ModeDePaiment;
import modele.Personne;
import modele.SituationFamiliale;
import modele.TypeDeContratDeTravail;

public class GarantDAOTests {

  private GarantDAO garantDAO;
  private Connector connector;
  private Location location;
  private Personne personne;
  private Logement logement;

  @Before
  public void setUp() throws SQLException {
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    garantDAO = new GarantDAO();
    Adresse adresse = new Adresse("10", "Rue de rangueil", "APT 13", "Paris", "75001");
    Personne p = new Personne(
        "Picquart",
        "Samuel",
        1,
        LocalDate.of(2003, 02, 18),
        "Bayonne",
        SituationFamiliale.MARIE,
        "Responsable d'équipes",
        "Mcdo",
        TypeDeContratDeTravail.CDI,
        850F,
        560F,
        "samuel.picq@test.fr",
        "0909090909",
        new Adresse(8, "rue des rose", "apt2", "31400", "tlse"));
    this.location = new Location(
        123, p, new LinkedList<Personne>(), LocalDate.of(2022, 02, 5), adresse, 500.f);
    Loyer loyer = new Loyer(0.0F, 5, LocalDate.now(), LocalDate.now(), ModeDePaiment.CB);
    Charges charges = new Charges(0.0F, 0.0F, 0.0F, 0.0F, 0.0F, 0, 0.0F, LocalDate.now());
    this.logement = new Logement(adresse, 0.0F, 0.0F, "refCadastrale", true, "numeroFiscal", 100.f, loyer, charges, LocalDate.now(), LocalDate.now(), "constatAmiante", "constatPlomb", "constatElectricite", null, null, "referenceLogement", true, "equipementAccesTechnologie");
    this.personne = new Personne(
        "Picquart",
        "Samuel",
        132,
        LocalDate.of(2003, 02, 18),
        "Bayonne",
        SituationFamiliale.MARIE,
        "Responsable d'équipes",
        "Mcdo",
        TypeDeContratDeTravail.CDI,
        850F,
        560F,
        "samuel@piquart.fr",
        "0909090909",
        new Adresse(8, "rue des rose", "apt2", "31400", "tlse"));
      }

  @Test
  public void testAjouterGarant() {
    LocationDAO locationDAO = new LocationDAO();
    locationDAO.create(location, logement);
    this.location = garantDAO.ajouterGarant(this.personne, this.location);
    assertEquals(1, this.location.getLocataires().size());
  }

  @Test
  public void testSupprimerGarant() {
    LocationDAO locationDAO = new LocationDAO();
    locationDAO.create(location, logement);
    this.location = garantDAO.ajouterGarant(this.personne, this.location);
    garantDAO.supprimerGarant(this.personne, this.location);
    assertEquals(0, this.location.getLocataires().size());
  }

  @Test
  public void testSupprimerTousLesGarants() {
    LocationDAO locationDAO = new LocationDAO();
    locationDAO.create(location, logement);
    this.location = garantDAO.ajouterGarant(this.personne, this.location);
    garantDAO.supprimerTousLesGarants(this.location);
    assertEquals(0, this.location.getLocataires().size());
  }
}
