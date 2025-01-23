package DAO;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.sql.SQLException;
import java.time.LocalDate;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import dao.PersonneDAO;
import jdbc.Connector;
import modele.Adresse;
import modele.Personne;
import modele.SituationFamiliale;
import modele.TypeDeContratDeTravail;

public class PersonneDAOTests {
  private PersonneDAO personneDAO;
  private Connector connector;

  @Before
  public void setUp() throws SQLException {
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    personneDAO = new PersonneDAO();
  }

  @After
  public void tearDown() throws SQLException {
    this.connector.getConnection().rollback();
    this.connector.closeConnection();
  }

  @Test
  public void testInsererUnePersonne() {
    Personne p =
        new Personne(
            "Picquart",
            "Samuel",
            187979897,
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
    p = this.personneDAO.create(p);
    Personne fetchedPersonne = this.personneDAO.find(p.getIdLocataire());
    assertNotNull(fetchedPersonne);
    assertEquals(p.getPrenom(), fetchedPersonne.getPrenom());
  }
}
