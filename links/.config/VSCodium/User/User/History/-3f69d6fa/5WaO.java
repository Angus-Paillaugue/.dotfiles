package dao.definitions;

import java.util.List;
import modele.Proprietaire;

public interface TravauxDAODef {

  Proprietaire create(Proprietaire travaux);

  Proprietaire find(int id);

  void update(Proprietaire travaux);

  void delete(int id);

  List<Proprietaire> findAll();

}
