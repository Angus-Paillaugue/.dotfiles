package dao.definitions;

import java.util.List;
import modele.Personne;

public interface PersonneDAODef {

  Personne create(Personne personne, int idAdresseResidence);

  Personne find(int id);

  void update(Personne personne, int idAdresseResidence);

  void delete(int id);

  List<Personne> findAll();

}
