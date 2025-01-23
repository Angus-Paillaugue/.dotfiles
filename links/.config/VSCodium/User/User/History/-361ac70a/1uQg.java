package DAO;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import java.sql.Connection;
import java.sql.SQLException;

import org.junit.Test;

import modele.Adresse;
import dao.AdresseDAO;
import dao.ProprietaireDAO;
import jdbc.Connector;

public class AdresseDAOTests {

  private Connection connection;
    private AdresseDAO adresseDAO;
    private Connector connector;


    @BeforeEach
    public void setUp() throws SQLException {
      connector = Connector.getInstance();
      connection.setAutoCommit(false);
      adresseDAO = new AdresseDAO();
    }

    @AfterEach
    public void tearDown() throws SQLException {
      connection.rollback();
      connector.closeConnection(connection);
    }

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
