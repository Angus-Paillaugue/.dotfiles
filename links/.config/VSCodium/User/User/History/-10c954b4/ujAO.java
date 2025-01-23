package modele;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Logement extends BienLouable {
  private String typePorte;
  private LocalDate datePermisConstruction;
  private LocalDate dateConstruction;
  private String constatAmiante;
  private String constatPlomb;
  private String constatElectricite;
  private noteEnergetique constatEnergetique;
  private noteEnergetique emissionGazEffetDeSerre;
  private String referenceLogement;
  private boolean meuble;
  private String equipementAccesTechnologie;
  private float surfaceTotale;
  private List<ElementEquipementLogement> elementEquipementLogement;
  private List<Garage> garage;

  // TODO: Handle pieces not being in the constructor and setters
  public Logement(
      Adresse adresse,
      String refCadastrale,
      boolean bati,
      float montantDepotGarantie,
      String numeroFiscal,
      float taxeFonciere,
      LoyerTests loyer,
      Charges charges,
      String typePorte,
      LocalDate datePermisConstruction,
      LocalDate dateConstruction,
      String constatAmiante,
      String constatPlomb,
      String constatElectricite,
      noteEnergetique constatEnergetique,
      noteEnergetique emissionGazEffetDeSerre,
      String referenceLogement,
      boolean meuble,
      String equipementAccesTechnologie) {
    super(
        adresse,
        refCadastrale,
        bati,
        montantDepotGarantie,
        numeroFiscal,
        taxeFonciere,
        loyer,
        charges);
    this.typePorte = typePorte;
    this.datePermisConstruction = datePermisConstruction;
    this.dateConstruction = dateConstruction;
    this.constatAmiante = constatAmiante;
    this.constatPlomb = constatPlomb;
    this.constatElectricite = constatElectricite;
    this.constatEnergetique = constatEnergetique;
    this.emissionGazEffetDeSerre = emissionGazEffetDeSerre;
    this.referenceLogement = referenceLogement;
    this.meuble = meuble;
    this.equipementAccesTechnologie = equipementAccesTechnologie;
    this.elementEquipementLogement = new ArrayList<>();
    this.garage = new ArrayList<>();
    this.surfaceTotale = 0;
  }

  public String getTypePorte() {
    return typePorte;
  }

  public LocalDate getDatePermisConstruction() {
    return datePermisConstruction;
  }

  public LocalDate getDateConstruction() {
    return dateConstruction;
  }

  public String getConstatAmiante() {
    return constatAmiante;
  }

  public String getConstatPlomb() {
    return constatPlomb;
  }

  public String getConstatElectricite() {
    return constatElectricite;
  }

  public noteEnergetique getConstatEnergetique() {
    return constatEnergetique;
  }

  public noteEnergetique getEmissionGazEffetDeSerre() {
    return emissionGazEffetDeSerre;
  }

  public String getReferenceLogement() {
    return referenceLogement;
  }

  public boolean isMeuble() {
    return meuble;
  }

  public String getEquipementAccesTechnologie() {
    return equipementAccesTechnologie;
  }

  public List<ElementEquipementLogement> getElementEquipementLogement() {
    return elementEquipementLogement;
  }

  public List<Garage> getGarage() {
    return garage;
  }

  // return la surface totale du logement
  @Override
  public float surfaceTotale() {
    return this.surfaceTotale;
  }

  public void setSurfaceTotale(float surfaceTotale) {
    this.surfaceTotale = surfaceTotale;
  }

  @Override
  public String toString() {
    return "Logement [typePorte="
        + typePorte
        + ", datePermisConstruction="
        + datePermisConstruction
        + ", dateConstruction="
        + dateConstruction
        + ", constatAmiante="
        + constatAmiante
        + ", constatPlomb="
        + constatPlomb
        + ", constatElectricite="
        + constatElectricite
        + ", constatEnergetique="
        + constatEnergetique
        + ", emissionGazEffetDeSerre="
        + emissionGazEffetDeSerre
        + ", referenceLogement="
        + referenceLogement
        + ", meuble="
        + meuble
        + ", equipementAccesTechnologie="
        + equipementAccesTechnologie
        + ", surfaceTotale="
        + surfaceTotale
        + ", elementEquipementLogement="
        + elementEquipementLogement
        + ", garage="
        + garage
        + "]";
  }
}
