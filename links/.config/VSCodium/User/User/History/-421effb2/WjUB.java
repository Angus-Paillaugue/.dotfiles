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
    Adresse = adresse = new Adresse("10", "Rue de rangueil", "APT 13", "Paris", "75001");
    Location location = new Location(
            1, p, new LinkedList<Personne>(), LocalDate.of(2022, 02, 5), this.adresse, 500.f);
  }
}
