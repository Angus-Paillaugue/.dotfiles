package dao.definitions;

import java.util.List;
import modele.Personne;

public interface PersonneDAODef {

  Personne create(Personne personne, int idAdresseResidence);

  Personne find(int id);

  Personne update(Personne personne, int idAdresseResidence);

  List<Personne> findAll();

}
