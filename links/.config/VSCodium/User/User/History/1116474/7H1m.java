package dao.definitions;

import java.util.List;
import modele.Logement;

public interface LoyerDAODef {

  Logement create(Logement loyer);

  Logement find(int id);

  void update(Logement loyer);

  void delete(int id);

  List<Logement> findAll();

}
