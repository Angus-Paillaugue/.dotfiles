package modele;

import java.util.ArrayList;
import java.util.List;

public class Batiment {
  private int id;
  private TypeDeBatiment typeBatiment;
  private Adresse adresse;
  private String numeroFiscal;
  private List<BienLouable> biensLouables;
  private List<Travaux> travaux;
  private List<Assurance> assurances;

  public Batiment(TypeDeBatiment typeBatiment, Adresse adresse) {
    this.adresse = adresse;
    this.typeBatiment = typeBatiment;
    this.biensLouables = new ArrayList<BienLouable>();
    this.travaux = new ArrayList<Travaux>();
    this.assurances = new ArrayList<Assurance>();
  }

  public Batiment(TypeDeBatiment typeBatiment, Adresse adresse, String numeroFiscal) {
    this.adresse = adresse;
    this.typeBatiment = typeBatiment;
    this.numeroFiscal = numeroFiscal;
    this.biensLouables = new ArrayList<BienLouable>();
    this.travaux = new ArrayList<Travaux>();
    this.assurances = new ArrayList<Assurance>();
  }

  public TypeDeBatiment getTypeBatiment() {
    return typeBatiment;
  }

  public Adresse getAdresse() {
    return adresse;
  }

  public String getNumeroFiscal() {
    return numeroFiscal;
  }

  public List<BienLouable> getBiensLouables() {
    return biensLouables;
  }

  public List<Travaux> getTravaux() {
    return travaux;
  }

  public List<Assurance> getAssurance() {
    return assurances;
  }

  public void setBiensLouables(List<BienLouable> biensLouables) {
    this.biensLouables = biensLouables;
  }

  public void setTravaux(List<Travaux> travaux) {
    this.travaux = travaux;
  }

  public void setAssurances(List<Assurance> assurances) {
    this.assurances = assurances;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getId() {
    return id;
  }

  public void setAdresse(Adresse adresse) {
    this.adresse = adresse;
  }

  public float totalCoutAssurance() {
    int total = 0;
    for (Assurance a : this.getAssurance()) {
      total += a.cout();
    }
    return total;
  }

  @Override
  public String toString() {
    return "Batiment [typeBatiment="
        + typeBatiment
        + ", adresse="
        + adresse
        + ", numeroFiscal="
        + numeroFiscal
        + ", biensLouables="
        + biensLouables
        + ", travaux="
        + travaux
        + ", assurances="
        + assurances
        + "]";
  }
}
