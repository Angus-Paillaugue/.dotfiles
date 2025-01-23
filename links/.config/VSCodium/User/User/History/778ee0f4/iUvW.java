package dao.definitions;

import modele.Location;
import modele.Personne;

public interface GarantDAODef {

  public Location ajouterGarant(Personne garant, Location location);

  public void supprimerGarant(Personne garant, Location location);

  public void supprimerTousLesGarants(Location location);

}
