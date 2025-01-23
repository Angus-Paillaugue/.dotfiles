package modele;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

public class Location {
  @Override
  public int hashCode() {
    return Objects.hash(caution, dateContrat, garants, lieuDeContrat, locataires);
  }

  public Location() {
    this.garants = new LinkedList<>();
    this.locataires = new LinkedList<>();
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null) return false;
    if (getClass() != obj.getClass()) return false;
    Location other = (Location) obj;
    return Float.floatToIntBits(caution) == Float.floatToIntBits(other.caution)
        && Objects.equals(dateContrat, other.dateContrat)
        && Objects.equals(garants, other.garants)
        && Objects.equals(lieuDeContrat, other.lieuDeContrat)
        && Objects.equals(locataires, other.locataires);
  }

  public LocalDate dateContrat;
  private int id;
  private Adresse lieuDeContrat;
  private List<Personne> locataires;
  private List<Personne> garants;
  private float caution;
  private int idLogement;
  private LocalDate dateFinContrat;

  // Constructeur pour une seule personne
  public Location(
      int id,
      Personne locataire1,
      List<Personne> garants,
      LocalDate dateContrat,
      Adresse lieuDeContrat,
      float caution) {
    this();
    this.id = id;
    this.locataires = new ArrayList<Personne>();
    this.locataires.add(locataire1);
    this.garants = garants;
    this.dateContrat = dateContrat;
    this.lieuDeContrat = lieuDeContrat;
    this.caution = caution;
  }

  public Location(
      Personne locataire1,
      List<Personne> garants,
      LocalDate dateContrat,
      Adresse lieuDeContrat,
      float caution) {
    this();
    this.locataires = new ArrayList<Personne>();
    this.locataires.add(locataire1);
    this.garants = garants;
    this.dateContrat = dateContrat;
    this.lieuDeContrat = lieuDeContrat;
    this.caution = caution;
  }

  public Location(
      int id,
      Personne locataire1,
      List<Personne> garants,
      LocalDate dateContrat,
      Adresse lieuDeContrat) {
    this();
    this.id = id;
    this.locataires.add(locataire1);
    if (garants != null)
      for (Personne p : garants) {
        this.garants.add(p);
      }
    this.dateContrat = dateContrat;
    this.lieuDeContrat = lieuDeContrat;
  }

  public Location(int id, LocalDate dateContrat, Adresse lieuDeContrat) {
    this();
    this.id = id;
    this.dateContrat = dateContrat;
    this.lieuDeContrat = lieuDeContrat;
  }

  public Location(
      Personne locataire1, List<Personne> garants, LocalDate dateContrat, Adresse lieuDeContrat) {
    this();
    this.locataires.add(locataire1);
    if (garants != null)
      for (Personne p : garants) {
        this.garants.add(p);
      }
    this.dateContrat = dateContrat;
    this.lieuDeContrat = lieuDeContrat;
  }

  public Location(int id, Personne locataire1, Personne locataire2) {
    this();
    this.id = id;
    this.locataires.add(locataire1);
    this.locataires.add(locataire2);
  }

  public Location(Personne locataire1, Personne locataire2) {
    this();
    this.locataires.add(locataire1);
    this.locataires.add(locataire2);
  }

  public LocalDate getDateContrat() {
    return this.dateContrat;
  }

  public LocalDate getDateFinContrat() {
    return this.dateFinContrat;
  }

  public Adresse getLieuDeContrat() {
    return this.lieuDeContrat;
  }

  public List<Personne> getLocataires() {
    return this.locataires;
  }

  public void setDateFinContrat(LocalDate dateFinContrat) {
    this.dateFinContrat = dateFinContrat;
  }

  public void setLocataires(List<Personne> personnes) {
    this.locataires = personnes;
  }

  public void addLocataire(Personne personne) {
    if (this.locataires.size() < 2 && personne != null) this.locataires.add(personne);
  }

  public void removeLocataires() {
    this.locataires = new LinkedList<Personne>();
  }

  public List<Personne> getGarants() {
    return this.garants;
  }

  public float TotalRevenusLocataires() {
    int total = 0;
    for (Personne l : this.getGarants()) {
      total += l.totalRevenus();
    }
    return total;
  }

  public void setId(int id) {
    this.id = id;
  }
  // Contructeur pour deux peronnes
  public Location(
      int id,
      Personne locataire1,
      Personne locataire2,
      List<Personne> garants,
      LocalDate dateContrat,
      Adresse lieuDeContrat,
      float caution) {
    this();
    this.id = id;
    this.locataires = new ArrayList<Personne>();
    this.locataires.add(locataire1);
    this.locataires.add(locataire2);
    this.garants = garants;
    this.dateContrat = dateContrat;
    this.lieuDeContrat = lieuDeContrat;
    this.caution = caution;
  }

  public float getCaution() {
    return this.caution;
  }

  public void clearLocation() {
    this.locataires.clear();
  }

  public void removeLoc(Personne personne) {
    this.locataires.remove(personne);
  }

  public int getIdLogement() {
    return this.idLogement;
  }

  public void setIdLogement(int idLogement) {
    this.idLogement = idLogement;
  }

  public int getId() {
    return this.id;
  }

  public void addGarant(Personne garant) {
    this.garants.add(garant);
  }

  public void removeGarant(Personne garant) {
    this.garants.remove(garant);
  }

  public void clearGarants() {
    this.garants.clear();
  }
}
