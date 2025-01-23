package dao.definitions;

import java.util.List;
import modele.Personne;

public interface PersonneDAODef {

  Personne create(Personne personne);

  Personne find(int id);

  Personne update(Personne personne);

  List<Personne> findAll();
}
