package dao.definitions;


import modele.Assurance;

public interface AssuranceDAODef {

  Assurance create(Assurance Assurance);

  Assurance findForLogement(int id);

  void delete(int numeroContrat);

  Assurance update(Assurance Assurance, int numeroContractOldAssurance);

}
