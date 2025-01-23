package DAO;
import static org.junit.Assert.*;
import org.junit.Test;

import dao.AssuranceDAO;
import modele.Assurance;

public class AssuranceDAOTests {
  @Test
  public void testUpdate() {
    Assurance assurance =
        new Assurance("Jurisprudence", "Assureur1", 123, 100);


    AssuranceDAO assuranceDAO = new AssuranceDAO();
    assuranceDAO.create(assurance);

    assurance.setNomAssureur("Assureur2");
    assurance.setNumeroContrat(124);
    assuranceDAO.update(assurance, 123);

    Assurance assuranceUpdated = assuranceDAO.find(124`);
    assertNotNull(assuranceUpdated);
    assertEquals("Assureur2", assuranceUpdated.getNomAssureur());
  }
}
