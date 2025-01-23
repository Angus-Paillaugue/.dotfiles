package DAO;
import static org.junit.Assert.*;

import java.sql.SQLException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import dao.AssuranceDAO;
import jdbc.Connector;
import modele.Assurance;

public class AssuranceDAOTests {

  private Connector connector;

  @Before
  public void setUp() throws SQLException {
    // Obtenir l'instance de Connector et configurer la connexion
    Connector.createDatabase();
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false); // Désactiver l'auto-commit pour les tests
  }

  @After
  public void tearDown() throws SQLException {
    // Annuler les modifications effectuées pendant le test
    this.connector.getConnection().rollback();
    this.connector.closeConnection();
  }



  @Test
  public void testUpdate() {
    Assurance assurance =
        new Assurance("Jurisprudence", "Assureur1", 123, 100);


    AssuranceDAO assuranceDAO = new AssuranceDAO();
    assuranceDAO.create(assurance);

    assurance.setNomAssureur("Assureur2");
    assurance.setNumeroContrat(124);
    assuranceDAO.update(assurance, 123);

    Assurance assuranceUpdated = assuranceDAO.find(124);
    assertNotNull(assuranceUpdated);
    assertEquals("Assureur2", assuranceUpdated.getNomAssureur());
  }
}
