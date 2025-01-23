package dao.definitions;

import java.util.List;
import modele.Personne;

public interface PersonneDAODef {

  Personne create(Personne personne, String adresseNaissance);

  Personne find(int id);

  Personne update(Personne personne, String adresseNaissance);

  List<Personne> findAll();
}
