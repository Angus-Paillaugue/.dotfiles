package dao.definitions;

import java.util.List;

import modele.Adresse;

public interface AdressesDAODef {

  Adresse create(Adresse adresse);

  Adresse find(int id);

  void update(Adresse adresse);

  void delete(int id);

  List<Adresse> findAll();

}
