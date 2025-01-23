package modele;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Location {
  public LocalDate dateContrat;
  private Adresse lieuDeContrat;
  private List<Personne> locataires;
  private List<Personne> garants;
  private float caution;

  // Constructeur pour une seule personne
  public Location(
      Personne locataire1,
      List<Personne> garants,
      LocalDate dateContrat,
      Adresse lieuDeContrat,
      float caution) {
    this.locataires = new ArrayList<Personne>();
    this.locataires.add(locataire1);
		this.garants = garants;
    this.dateContrat = dateContrat;
    this.lieuDeContrat = lieuDeContrat;
    this.caution = caution;
  }

  // Contructeur pour deux peronnes
  public Location(
      Personne locataire1,
      Personne locataire2,
      List<Personne> garants,
      LocalDate dateContrat,
      Adresse lieuDeContrat,
      float caution) {
    this.locataires = new ArrayList<Personne>();
    this.locataires.add(locataire1);
    this.locataires.add(locataire2);
    this.garants = garants;
    this.dateContrat = dateContrat;
    this.lieuDeContrat = lieuDeContrat;
    this.caution = caution;
  }

  public LocalDate getDateContrat() {
    return this.dateContrat;
  }

  public Adresse getLieuDeContrat() {
    return this.lieuDeContrat;
  }

  public List<Personne> getLocataires() {
    return this.locataires;
  }

  public List<Personne> getGarants() {
    return this.garants;
  }

  public float getCaution() {
    return this.caution;
  }

  public void addGarant(Personne garant) {
    this.garants.add(garant);
  }

  public float TotalRevenusLocataires() {
    int total = 0;
    for (Personne l : this.getGarants()) {
      total += l.totalRevenus();
    }

    return total;
  }
}
