package dao.definitions;

import java.util.List;
import modele.Jurisprudence;

public interface JurisprudenceDAODef {

  Jurisprudence create(Jurisprudence jurisprudence);

  Jurisprudence find(int id);

  void update(Jurisprudence jurisprudence);

  void delete(int id);

  List<Jurisprudence> findAll();

}
