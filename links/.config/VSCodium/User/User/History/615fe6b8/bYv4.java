package dao.definitions;

import java.util.List;

import modele.Charges;

public interface ChargesDAODef {

  Charges create(Charges c, int idBienLouable);

  Charges find(int id);

  Charges update(Charges c, int inParent);

  void delete(int id);

  List<Charges> findAll();

  List<Charges> findByBienLouable(int bienLouableId);
}
