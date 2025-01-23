package modele;

import java.util.LinkedList;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class Colocation {
  private List<Location> colocations;

  @Override
  public int hashCode() {
    return Objects.hash(colocations);
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null) return false;
    if (getClass() != obj.getClass()) return false;
    return equals((Colocation)obj);
  }

  public boolean equals(Colocation c) {
	    if (this == c) return true;
	    if (c == null) return false;
	    for(int i = 0; i < toString().length(); ++i)
	    	if(toString().charAt(i) != c.toString().charAt(i))
	    		return false;
	    return toString().length() == c.toString().length();
	  }

  public Colocation() {
    this.colocations = new LinkedList<>();
  }

  public Colocation(List<Location> _colocations) {
    this.colocations = _colocations;
  }

  public List<Personne> getColocataires() {
    return colocations.stream()
        .map(_loc -> _loc.getLocataires())
        .flatMap(List::stream)
        .collect(Collectors.toList());
  }

  public void delColoc(Personne coloc) {
    this.colocations.stream()
        .filter(_loc -> _loc.getLocataires().contains(coloc))
        .forEach(_loc -> _loc.removeLoc(coloc));
  }

  public void delColocByID(int id) {
    for (Personne p : this.getColocataires()) {
      if (p.getIdLocataire() == id) {
        this.getColocataires().remove(p);
      }
    }
  }

  public List<Personne> getGarants() {
    return (List<Personne>)
        this.colocations.stream()
            .map(_loc -> _loc.getGarants())
            .flatMap(List::stream)
            .collect(Collectors.toList());
  }

  public void clearColoc() {
    this.colocations.clear();
  }

  public List<Personne> getGarants(Personne coloc) {
    return this.colocations.stream()
        .filter(_loc -> _loc.getLocataires().contains(coloc))
        .map(_loc -> _loc.getGarants())
        .flatMap(List::stream)
        .collect(Collectors.toList());
  }

  public LocalDate getDateContrat(Personne coloc) {
    return (LocalDate)
        this.colocations.stream()
            .filter(_loc -> _loc.getLocataires().contains(coloc))
            .map(_loc -> _loc.getDateContrat())
            .limit(1)
            .toArray()[0];
  }

  public Adresse getLieuDeContrat(Personne coloc) {
    return (Adresse)
        this.colocations.stream()
            .filter(_loc -> _loc.getLocataires().contains(coloc))
            .map(_loc -> _loc.getLieuDeContrat())
            .limit(1)
            .toArray()[0];
  }

  public void addColocataire(
      Personne colocataire,
      List<Personne> garants,
      LocalDate dateContrat,
      Adresse lieuDeContrat,
      float caution) {
    addColoc(colocataire, garants, dateContrat, lieuDeContrat, caution);
  }

  public List<Location> getContrats() {
    return this.colocations;
  }

  public void addColoc(
      Personne colocataire,
      List<Personne> garants,
      LocalDate dateContrat,
      Adresse lieuDeContrat,
      float caution
      ) {
    this.colocations.add(new Location(colocataire, garants, dateContrat, lieuDeContrat, caution));
  }

  public void addColoc(Location l) {
    this.colocations.add(l);
  }

  public void addColocataire(Location l) {
    this.colocations.add(l);
  }

  @Override
  public String toString()
  {
	  String r = "Colocation [ ";
      for(Location _l : getContrats())
      	r += _l.toString() + " ";
	  return r + "]";
  }

}
