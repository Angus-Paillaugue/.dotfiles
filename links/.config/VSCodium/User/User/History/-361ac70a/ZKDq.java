package DAO;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import java.sql.Connection;
import java.sql.SQLException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import modele.Adresse;
import dao.AdresseDAO;
import jdbc.Connector;

public class AdresseDAOTests {
  private AdresseDAO adresseDAO;
  private Connector connector;

  @Before
  public void setUp() throws SQLException {
    this.connector = Connector.getInstance();
    Connector.createDatabase();
    this.connector.getConnection().setAutoCommit(false);
    adresseDAO = new AdresseDAO();
  }

  @After
  public void tearDown() throws SQLException {
    this.connector.getConnection().rollback();
    this.connector.closeConnection();
  }

  @Test
  public void testAdresseSansComplement() {
    Adresse adresse = new Adresse("123", "Main St", "Springfield", "12345");
    int insertedRowId = this.adresseDAO.create(adresse);
    System.out.println("insertedRowId: " + insertedRowId);
    assertEquals("123", adresse.getNumero());
    // assertEquals("Main St", adresse.getRue());
    // assertNull(adresse.getComplement());
    // assertEquals("Springfield", adresse.getVille());
    // assertEquals("12345", adresse.getCp());
  }

}
