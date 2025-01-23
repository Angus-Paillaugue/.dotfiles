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

  private Location() {
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
    this.locataires = new LinkedList<Personne>();
    this.locataires.add(locataire1);
    this.garants = garants;
    this.dateContrat = dateContrat;
    this.lieuDeContrat = lieuDeContrat;
  }

  public Location(
      Personne locataire1, List<Personne> garants, LocalDate dateContrat, Adresse lieuDeContrat) {
    this();
    this.locataires = new LinkedList<Personne>();
    this.locataires.add(locataire1);
    this.garants = garants;
    this.dateContrat = dateContrat;
    this.lieuDeContrat = lieuDeContrat;
  }

  public Location(int id, Personne locataire1, Personne locataire2) {
    this();
    this.id = id;
    this.locataires = new LinkedList<>();
    this.locataires.add(locataire1);
    this.locataires.add(locataire2);
  }

  public Location(Personne locataire1, Personne locataire2) {
    this();
    this.locataires = new LinkedList<>();
    this.locataires.add(locataire1);
    this.locataires.add(locataire2);
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

  public void setLocataires(List<Personne> personnes) {
    this.locataires = personnes;
  }

  public void addLocataire(Personne personne) {
    if (this.locataires.size() < 2) this.locataires.add(personne);
  }

  public void supprimmerLocataires() {
    this.locataires = new ArrayList<Personne>();
  }

  public List<Personne> getGarants() {
    return this.garants;
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

  public int getId() {
    return this.id;
  }
}
