package modele;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Colocation {

  private Map<Personne, List<Object>> colocataires;

  public Colocation() {
    this.colocataires = new HashMap<>();
  }

  public Map<Personne, List<Object>> getColocataires() {
    return colocataires;
  }

  public List<Personne> getGarants(Personne coloc) {
    return (List<Personne>) this.colocataires.get(coloc).get(0);
  }

  public Date getDateContrat(Personne coloc) {
    return (Date) this.colocataires.get(coloc).get(1);
  }

  public int getDuree(Personne coloc) {
    return (int) this.colocataires.get(coloc).get(2);
  }

  public String getLieuDeContrat(Personne coloc) {
    return (String) this.colocataires.get(coloc).get(3);
  }

  public void addColoc(Personne colocataire, List<Personne> garants, Date dateContrat, int duree,
      String lieuDeContrat) {
    List<Object> informations = new ArrayList<>();
    informations.add(garants);
    informations.add(dateContrat);
    informations.add(duree);
    informations.add(lieuDeContrat);
    this.colocataires.put(colocataire, informations);
  }

  public void delColoc(Personne coloc) {
    this.colocataires.remove(coloc);
  }

}
