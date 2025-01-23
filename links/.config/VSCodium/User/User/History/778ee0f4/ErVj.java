package dao.definitions;

import modele.Location;
import modele.Personne;

public interface GarantDAO {

  public void ajouterGarant(Personne garant, Location location);

}
