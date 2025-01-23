package DAO;

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

  @Before
  public void setUp() throws SQLException {
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    garantDAO = new GarantDAO();
    LocationDAO locationDAO = new LocationDAO();
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
    Location location = new Location(
        1, p, new LinkedList<Personne>(), LocalDate.of(2022, 02, 5), adresse, 500.f);
    Loyer loyer = new Loyer(0.0F, 5, LocalDate.now(), LocalDate.now(), ModeDePaiment.CB);
    Charges charges = new Charges(0.0F, 0.0F, 0.0F, 0.0F, 0.0F, 0, 0.0F, LocalDate.now());
    Logement logement = new Logement(adresse, 0.0F, 0.0F, "refCadastrale", true, "numeroFiscal", 100.f, loyer, charges, LocalDate.now(), LocalDate.now(), "constatAmiante", "constatPlomb", "constatElectricite", null, null, "referenceLogement", true, "equipementAccesTechnologie");
    locationDAO.create(location, logement);
  }

  @Test
  public void testAjouterGarant() {
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
        560F
    );
  }
}
