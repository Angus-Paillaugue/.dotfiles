package DAO;

import static org.junit.Assert.*;

import java.util.LinkedList;
import java.util.List;

import dao.AdresseDAO;
import dao.BatimentDAO;
import dao.ColocationDAO;
import dao.LogementDAO;
import jdbc.Connector;
import modele.Adresse;
import modele.Batiment;
import modele.Charges;
import modele.Colocation;
import modele.Location;
import modele.Logement;
import modele.Loyer;
import modele.ModeDePaiment;
import modele.noteEnergetique;
import modele.Personne;
import modele.SituationFamiliale;
import modele.TypeDeBatiment;
import modele.TypeDeContratDeTravail;

import org.junit.Before;
import org.junit.Test;

import java.sql.SQLException;
import java.time.LocalDate;

public class ColocationDAOTests {
  private AdresseDAO adresseDAO;
  private Adresse adresse;
  // private Adresse adresse2;
  private ColocationDAO colocationDAO;
  private Connector connector;
  private Location location;
  private Logement logement;
  private Personne personne;

  @Before
  public void setUp() throws SQLException {
    // Obtenir l'instance de Connector et configurer la connexion
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    // Initialiser les DAO
    this.colocationDAO = new ColocationDAO();
    this.adresseDAO = new AdresseDAO();
    this.adresse = new Adresse("10", "Rue de rangueil", "APT 13", "Paris", "75001");
    // this.adresse2 = new Adresse("8", "Rue des fleurs", "APT 53", "Limoges", "82687");
    this.adresseDAO.create(adresse);
    this.logement =
        new Logement(
            this.adresse,
            20,
            20,
            "12345678AB",
            true,
            "123456789012",
            950.0F,
            new Loyer(
                750.0F, 05, LocalDate.of(2024, 8, 11), LocalDate.of(2025, 9, 11), ModeDePaiment.CB),
            new Charges(100, 50, 30, 20, 200, 2, 2, LocalDate.now()),
            LocalDate.of(2018, 1, 1),
            LocalDate.of(2019, 2, 2),
            "/chemin/constatAmiante.pdf",
            "/chemin/constatPlomb.pdf",
            "/chemin/constatElec.pdf",
            noteEnergetique.A,
            noteEnergetique.C,
            "Ref logement",
            true,
            "Equipement fibre...");
    this.personne =
        new Personne(
            "Picquart",
            "Samuel",
            1,
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
    this.location =
        new Location(
            1,
            this.personne,
            new LinkedList<Personne>(),
            LocalDate.of(2022, 02, 5),
            this.adresse,
            500.f);
    Batiment batiment =
        new Batiment(
            TypeDeBatiment.MAISON,
            new Adresse(2, "123", "Main St", "Springfield", "12345"),
            "12345");
    batiment = new BatimentDAO().create(batiment);
    this.logement = new LogementDAO().create(this.logement, 543);
  }

  @Test
  public void testFindByLogement() {
    List<Location> locations = new LinkedList<>();
    locations.add(this.location);
    Colocation colocation = this.colocationDAO.create(new Colocation(locations), this.logement);
    colocation = this.colocationDAO.findByLogement(this.logement);
    assertNotNull(colocation);
  }

  @Test
  public void testFindAll() {
    List<Location> locations = new LinkedList<>();
    locations.add(this.location);
    this.colocationDAO.create(new Colocation(locations), this.logement);
    List<Colocation> colocations = this.colocationDAO.findAll();
    assertNotNull(colocations);
  }

  // @Test
  // public void testUpdate() {
  //   List<Location> _locations = new LinkedList<>();
  //   _locations.add(this.location);
  //   this.colocation = this.colocationDAO.create(new Colocation(_locations), this.logement);
  //   assertTrue(colocation.getColocataires().size() > 0);
  //   colocation.getColocataires().get(0).setAdresse(this.adresse2);
  //   this.colocationDAO.update(colocation);
  //   assertEquals(colocation.getColocataires().get(0).getAdresse(), this.adresse2);
  // }
}
