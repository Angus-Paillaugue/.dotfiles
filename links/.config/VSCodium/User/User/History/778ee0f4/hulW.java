package dao.definitions;

import modele.Location;
import modele.Personne;

public interface GarantDAODef {

  public Location ajouterGarant(Personne garant, Location location, Boolean isColocation);

  public Location supprimerGarant(Personne garant, Location location);

  public Location supprimerTousLesGarants(Location location);
}
