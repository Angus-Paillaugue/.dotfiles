package dao.definitions;

import java.util.List;
import modele.Proprietaire;

public interface ProprietaireDAODef {

  Proprietaire create(Proprietaire proprietaire);

  Proprietaire find(int id);

  void update(Proprietaire proprietaire);

  void delete(int id);

  List<Proprietaire> findAll();

  Proprietaire findByMail(String mail);
}
