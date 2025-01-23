package dao.definitions;

import java.util.List;

import modele.Adresse;

public class AdressesDAODef {

  Adresse create(Adresse a);

  default Adresse create(T t, int inParent) {
    return null;
  }

  Adresse find(int id);

  void update(T adresse);

  default Adresse update(Adresse t, int inParent) {
    return null;
  }

  void delete(int id);

  List<Adresse> findAll();

}
