package dao.definitions;

import java.util.List;

import modele.Location;
import modele.Logement;

public interface LogementDAODef {

  Logement create(Logement logement, int idBatiment);

  Logement find(int id);

  void update(Logement logement);

  void delete(int id);

  List<Logement> findAll();

  Location findLocationByLogement(int idLogement);
}
