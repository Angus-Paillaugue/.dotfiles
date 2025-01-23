package dao.definitions;


import modele.Assurance;

public interface AssuranceDAODef {

  Assurance create(Assurance Assurance);

  Assurance findForLogement(int id);

  void delete(int numeroContrat);

  void update(Assurance Assurance, int numeroContractOldAssurance);

}
