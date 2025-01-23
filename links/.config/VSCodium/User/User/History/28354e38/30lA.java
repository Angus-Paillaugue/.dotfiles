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

    new AssuranceDAO().update(assurance, -1);
  }
}
