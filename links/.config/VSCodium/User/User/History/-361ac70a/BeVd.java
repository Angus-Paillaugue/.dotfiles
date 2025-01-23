package DAO;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import org.junit.Test;

import modele.Adresse;
import dao.AdresseDAO;

public class AdresseDAOTests {

  @Test
  public void testAdresseSansComplement() {
    Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
    AdresseDAO adresseDAO = new AdresseDAO();
    int insertedRowId = adresseDAO.create(adresse);
    // assertEquals("123", adresse.getNumero());
    // assertEquals("Main St", adresse.getRue());
    // assertNull(adresse.getComplement());
    // assertEquals("Springfield", adresse.getVille());
    // assertEquals("12345", adresse.getCp());
  }

}
