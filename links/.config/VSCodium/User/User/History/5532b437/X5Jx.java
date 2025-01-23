import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import dao.AdresseDAO;
import dao.ColocationDAO;
import dao.PersonneDAO;
import jdbc.Connector;
import modele.Adresse;
import modele.Charges;
import modele.Colocation;
import modele.Location;
import modele.Logement;
import modele.Loyer;
import modele.ModeDePaiment;
import modele.Personne;
import modele.SituationFamiliale;
import modele.TypeDeContratDeTravail;
import modele.noteEnergetique;
import utils.Logger;

public class ColocationTests {

	  private Adresse adresse;
	  private Colocation colocation;
	  private Logement logement;

		private Connector db;
	    private Loyer loyer;
	    private Charges charges;

	    @Before
	    public void setUp()
	    {
	    	try {
	    		db = Connector.getInstance();
	    	}
	    	catch( Exception e)
	    	{
	    		Logger.error(e);
	    	}
	    	adresse = new Adresse("123", "Main St", "Springfield", "12345");
	    	loyer = new Loyer(1000, 1, LocalDate.now(), LocalDate.now().plusYears(1), ModeDePaiment.VIREMENT);
	    	charges = new Charges(100, 50, 30, 20, 200, 20, 30, LocalDate.parse("2025-01-06"));
	    	logement =
	    	        new Logement(
	    	                adresse,
	    	                10,
	    	                10,
	    	                "RC123",
	    	                true,
	    	                "NF123",
	    	                300,
	    	                loyer,
	    	                charges,
	    	                LocalDate.of(2000, 1, 1),
	    	                LocalDate.of(2001, 1, 1),
	    	                "No",
	    	                "No",
	    	                "Yes",
	    	                noteEnergetique.A,
	    	                noteEnergetique.B,
	    	                "REF123",
	    	                true,
	    	                "Fiber");

	    }

	    @After
	    public void tearDown()
	    {
	    	db.closeConnection();
	    }

	  @Test
	  public void testSinglePersonConstructor() {
	    Personne locataire =
	        new Personne(
	            "Doe",
	            "John",
	            1,
	            LocalDate.of(1990, 1, 1),
	            "Springfield",
	            null,
	            "Engineer",
	            "Company",
	            null,
	            3000,
	            500,
	            "john.doe@example.com",
	            "1234567890",
	            null);
	    locataire.setIdLocataire(1);
	    Personne locataire2 =
	        new Personne(
	            "Doe",
	            "Jane",
	            2,
	            LocalDate.of(1992, 2, 2),
	            "Springfield",
	            null,
	            "Doctor",
	            "Hospital",
	            null,
	            4000,
	            600,
	            "jane.doe@example.com",
	            "0987654321",
	            null);
	    locataire2.setIdLocataire(2);
	    List<Personne> garants = Arrays.asList(locataire2);
	    LocalDate dateContrat = LocalDate.now();
	    Adresse lieuDeContrat = new Adresse("123", "Main St", "Springfield", "12345");
	    float caution = 500;

	    Location location = new Location(locataire, garants, dateContrat, lieuDeContrat, caution);

	    assertEquals(dateContrat, location.getDateContrat());
	    assertEquals(lieuDeContrat, location.getLieuDeContrat());
	    assertEquals(1, location.getLocataires().size());
	    assertEquals(locataire, location.getLocataires().get(0));
	    assertEquals(garants, location.getGarants());
	    assertEquals(caution, location.getCaution(), 0.01);
	  }

	  @Test
	  public void testAddGarant() {
	    Personne locataire =
	        new Personne(
	            "Doe",
	            "John",
	            5,
	            LocalDate.of(1990, 1, 1),
	            "Springfield",
	            null,
	            "Engineer",
	            "Company",
	            null,
	            3000,
	            500,
	            "john.doe@example.com",
	            "1234567890",
	            null);
	    locataire.setIdLocataire(1);
	    List<Personne> garants = new ArrayList<>();
	    LocalDate dateContrat = LocalDate.now();
	    Adresse lieuDeContrat = new Adresse("123", "Main St", "Springfield", "12345");
	    float caution = 500;

	    Location location = new Location(locataire, garants, dateContrat, lieuDeContrat, caution);
	    Personne newGarant =
	        new Personne(
	            "Doe",
	            "Jane",
	            6,
	            LocalDate.of(1992, 2, 2),
	            "Springfield",
	            null,
	            "Doctor",
	            "Hospital",
	            null,
	            4000,
	            600,
	            "jane.doe@example.com",
	            "0987654321",
	            null);
	    newGarant.setIdLocataire(2);
	    location.addGarant(newGarant);

	    assertEquals(1, location.getGarants().size());
	    assertEquals(newGarant, location.getGarants().get(0));
	  }

	  @Test
	  public void testTotalRevenusLocataires() {
	    Personne locataire =
	        new Personne(
	            "Doe",
	            "John",
	            7,
	            LocalDate.of(1990, 1, 1),
	            "Springfield",
	            null,
	            "Engineer",
	            "Company",
	            null,
	            3000,
	            500,
	            "john.doe@example.com",
	            "1234567890",
	            null);
	    locataire.setIdLocataire(1);

	    Personne garant =
	        new Personne(
	            "Doe",
	            "Jane",
	            8,
	            LocalDate.of(1992, 2, 2),
	            "Springfield",
	            null,
	            "Doctor",
	            "Hospital",
	            null,
	            4000,
	            600,
	            "jane.doe@example.com",
	            "0987654321",
	            null);
	    garant.setIdLocataire(2);
	    List<Personne> garants = Arrays.asList();
	    LocalDate dateContrat = LocalDate.now();
	    Adresse lieuDeContrat = new Adresse("123", "Main St", "Springfield", "12345");
	    float caution = 500;

	    Location location = new Location(locataire, garants, dateContrat, lieuDeContrat, caution);

	    assertEquals(0, location.TotalRevenusLocataires(), 0.0F);
	  }

	  @Test
	  public void testDeleteLocation()
	  {
		  Adresse _adresse = new Adresse("123", "Main St", "Springfield", "12345");
		  Personne locataire =
	            new Personne(
	                "Doe",
	                "John",
	                7,
	                LocalDate.of(1990, 1, 1),
	                "Springfield",
	                SituationFamiliale.CELIBATAIRE,
	                "Engineer",
	                "Company",
	                TypeDeContratDeTravail.CDI,
	                3000,
	                500,
	                "john.doe@example.com",
	                "1234567890",
	                _adresse);
	        locataire.setIdLocataire(1);

	        Personne garant =
	            new Personne(
	                "Doe",
	                "Jane",
	                8,
	                LocalDate.of(1992, 2, 2),
	                "Springfield",
	                SituationFamiliale.CELIBATAIRE,
	                "Doctor",
	                "Hospital",
	                TypeDeContratDeTravail.CDI,
	                4000,
	                600,
	                "jane.doe@example.com",
	                "0987654321",
	                _adresse);
	        PersonneDAO personne = new PersonneDAO();
	        personne.create(garant, _adresse.getId());
	        personne.create(locataire, _adresse.getId());
	        garant.setIdLocataire(2);
	        List<Personne> garants = Arrays.asList();
	        LocalDate dateContrat = LocalDate.now();
	        Adresse lieuDeContrat = new Adresse("321", "Times Square", "New York City", "12345");
	        AdresseDAO adao = new AdresseDAO();
	        adao.create(lieuDeContrat);

	        float caution = 500;

	        Location location = new Location(locataire, garants, dateContrat, lieuDeContrat, caution);
	        ColocationDAO dao = new ColocationDAO();
	        colocation = new Colocation(Arrays.asList(location));
	        dao.create(location, logement);
	        dao.delete(colocation);
	        Colocation _found = dao.findByLogementArchive(logement);
	        boolean equals = colocation.equals(_found);
	        assertTrue(equals);
	  }
}
