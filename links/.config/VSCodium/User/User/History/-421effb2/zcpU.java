package DAO;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.LinkedList;

import org.junit.Before;
import org.junit.Test;

import dao.GarantDAO;
import jdbc.Connector;
import modele.Adresse;
import modele.Location;
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
  }

  @Test
  public void testAjouterGarant() {
    Adresse adresse = new Adresse("10", "Rue de rangueil", "APT 13", "Paris", "75001");
    Personne p =
        new Personne(
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
  }
}
