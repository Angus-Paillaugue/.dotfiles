package dao.definitions;

import modele.Assurance;

public interface AssuranceDAODef {

  Assurance create(Assurance Assurance);

  void delete(int numeroContrat);

  void update(Assurance Assurance, int numeroContractOldAssurance);
}
