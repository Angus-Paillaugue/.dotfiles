package dao.definitions;

import java.util.List;

import modele.Charges;

public interface ChangesDAODef {

  Charges create(Charges charges);

  Charges find(int id);

  void update(Charges charges);

  void delete(int id);

  List<Charges> findAll();

}
