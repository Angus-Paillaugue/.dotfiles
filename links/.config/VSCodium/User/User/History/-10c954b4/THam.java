package modele;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Logement extends BienLouable {
  @Override
  public int hashCode() {
    return Objects.hash(
        constatAmiante,
        constatElectricite,
        constatEnergetique,
        constatPlomb,
        dateConstruction,
        datePermisConstruction,
        elementEquipementLogement,
        emissionGazEffetDeSerre,
        equipementAccesTechnologie,
        garage,
        id,
        meuble,
        referenceLogement);
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null) return false;
    if (getClass() != obj.getClass()) return false;
    Logement other = (Logement) obj;
    return Objects.equals(constatAmiante, other.constatAmiante)
        && Objects.equals(constatElectricite, other.constatElectricite)
        && Objects.equals(constatEnergetique, other.constatEnergetique)
        && Objects.equals(constatPlomb, other.constatPlomb)
        && Objects.equals(dateConstruction, other.dateConstruction)
        && Objects.equals(datePermisConstruction, other.datePermisConstruction)
        && Objects.equals(elementEquipementLogement, other.elementEquipementLogement)
        && Objects.equals(emissionGazEffetDeSerre, other.emissionGazEffetDeSerre)
        && Objects.equals(equipementAccesTechnologie, other.equipementAccesTechnologie)
        && Objects.equals(garage, other.garage)
        && Objects.equals(id, other.id)
        && Objects.equals(meuble, other.meuble)
        && Objects.equals(referenceLogement, other.referenceLogement);
  }

  private int id;
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
  private List<ElementEquipementLogement> elementEquipementLogement;
  private List<Garage> garage;
  private int nbPieces;

  public Logement(
      Adresse adresse,
      float surfaceHabitable,
      float surfaceTotale,
      String refCadastrale,
      boolean bati,
      String numeroFiscal,
      float taxeFonciere,
      Loyer loyer,
      Charges charges,
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
        surfaceHabitable,
        surfaceTotale,
        refCadastrale,
        bati,
        numeroFiscal,
        taxeFonciere,
        loyer,
        charges);
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
  }

  public int getId() {
    return id;
  }

  public void addElementEquipementLogement(ElementEquipementLogement elementEquipementLogement) {
    this.elementEquipementLogement.add(elementEquipementLogement);
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

  public void setId(int id) {
    this.id = id;
  }

  public void setDatePermisConstruction(LocalDate datePermisConstruction) {
    this.datePermisConstruction = datePermisConstruction;
  }

  public void setDateConstruction(LocalDate dateConstruction) {
    this.dateConstruction = dateConstruction;
  }

  public void setConstatAmiante(String constatAmiante) {
    this.constatAmiante = constatAmiante;
  }

  public void setConstatPlomb(String constatPlomb) {
    this.constatPlomb = constatPlomb;
  }

  public void setConstatElectricite(String constatElectricite) {
    this.constatElectricite = constatElectricite;
  }

  public void setConstatEnergetique(noteEnergetique constatEnergetique) {
    this.constatEnergetique = constatEnergetique;
  }

  public void setEmissionGazEffetDeSerre(noteEnergetique emissionGazEffetDeSerre) {
    this.emissionGazEffetDeSerre = emissionGazEffetDeSerre;
  }

  public void setReferenceLogement(String referenceLogement) {
    this.referenceLogement = referenceLogement;
  }

  public void setMeuble(boolean meuble) {
    this.meuble = meuble;
  }

  public void setEquipementAccesTechnologie(String equipementAccesTechnologie) {
    this.equipementAccesTechnologie = equipementAccesTechnologie;
  }

  public void setElementEquipementLogement(
      List<ElementEquipementLogement> elementEquipementLogement) {
    this.elementEquipementLogement = elementEquipementLogement;
  }

  public void setGarage(List<Garage> garage) {
    this.garage = garage;
  }

  public void addGarage(Garage garage) {
    this.garage.add(garage);
  }

  public void setNbPieces(int _nbPieces) {
    this.nbPieces = _nbPieces;
  }

  public int getNbPieces() {
    return this.nbPieces;
  }

  @Override
  public String toString() {
    return "Logement [id="
        + id
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
        + this.getSurfaceTotale()
        + ", elementEquipementLogement="
        + elementEquipementLogement
        + ", garage="
        + garage
        + "]";
  }
}
