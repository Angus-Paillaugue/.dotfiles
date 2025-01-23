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
  private float surfaceTatle;
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
      Loyer loyer,
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
    this.pieces = new ArrayList<>();
    this.elementEquipementLogement = new ArrayList<>();
    this.garage = new ArrayList<>();
  }
  /*
    public Logement(
        Adresse adresse,
        String refCadastrale,
        boolean bati,
        float montantDepotGarantie,
        String numeroFiscal,
        float taxeFonciere,
        Colocation colocation,
        Loyer loyer,
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
          colocation,
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
      this.pieces = new ArrayList<>();
      this.elementEquipementLogement = new ArrayList<>();
      this.garage = new ArrayList<>();
    }
  */
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

  public List<Piece> getPieces() {
    return pieces;
  }

  public List<ElementEquipementLogement> getElementEquipementLogement() {
    return elementEquipementLogement;
  }

  public List<Garage> getGarage() {
    return garage;
  }

  // return la surface habitable totale du logement (un garage n'a pas de surface
  // habitable)
  public float surfaceTotaleHabitable() {
    float total = 0F;
    for (Piece p : this.getPieces()) {
      total += p.getSurfaceHabitable();
    }
    return total;
  }

  // return la surface habitable totale du logement (un garage n'a pas de surface
  // habitable)
  public float surfaceTotaleNonHabitable() {
    float total = 0F;
    for (Piece p : this.getPieces()) {
      total += p.getSurfaceNonHabitable();
    }
    for (Garage g : this.getGarage()) {
      total += g.surfaceTotale();
    }
    return total;
  }

  // return la surface totale du logement
  @Override
  public float surfaceTotale() {
    float total = 0F;
    total += this.surfaceTotaleHabitable() + this.surfaceTotaleNonHabitable();
    return total;
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
        + ", surfaceTatle="
        + pieces
        + ", elementEquipementLogement="
        + elementEquipementLogement
        + ", garage="
        + garage
        + "]";
  }
}
