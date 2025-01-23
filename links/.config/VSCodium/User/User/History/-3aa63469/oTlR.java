package dao.definitions;

import java.util.List;
import modele.Personne;

public interface PersonneDAODef {

  Personne create(Personne personne);

  Personne find(int id);

  void update(Personne personne);

  void delete(int id);

  List<Personne> findAll();

}
