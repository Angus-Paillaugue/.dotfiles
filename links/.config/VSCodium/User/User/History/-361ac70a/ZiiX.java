package DAO;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import java.sql.Connection;
import java.sql.SQLException;

import org.junit.Test;

import modele.Adresse;
import dao.AdresseDAO;
import dao.ProprietaireDAO;

public class AdresseDAOTests {

  private Connection connection;
    private AdresseDAO adresseDAO;
    

    @BeforeEach
    public void setUp() throws SQLException {
      connection = DatabaseConnection.getConnection();
      connection.setAutoCommit(false);
      bienImmobilierDAO = new BienImmobilierDAO(connection);
      proprietaireDAO = new ProprietaireDAO(connection);
    }

    @AfterEach
    public void tearDown() throws SQLException {
      connection.rollback();
      DatabaseConnection.closeConnection(connection);
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
