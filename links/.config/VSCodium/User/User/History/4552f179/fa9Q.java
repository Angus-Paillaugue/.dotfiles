package modele;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public abstract class BienLouable {
  @Override
  public int hashCode() {
    return Objects.hash(
        adresse,
        assurance,
        bati,
        charges,
        colocation,
        id,
        location,
        loyer,
        numeroFiscal,
        refCadastrale,
        taxeFonciere,
        travaux);
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null) return false;
    if (getClass() != obj.getClass()) return false;
    BienLouable other = (BienLouable) obj;
    return Objects.equals(adresse, other.adresse)
        && Objects.equals(assurance, other.assurance)
        && bati == other.bati
        && Objects.equals(charges, other.charges)
        && Objects.equals(colocation, other.colocation)
        && id == other.id
        && Objects.equals(location, other.location)
        && Objects.equals(loyer, other.loyer)
        && Objects.equals(numeroFiscal, other.numeroFiscal)
        && Objects.equals(refCadastrale, other.refCadastrale)
        && Float.floatToIntBits(taxeFonciere) == Float.floatToIntBits(other.taxeFonciere)
        && Objects.equals(travaux, other.travaux);
  }

  private int id;
  private Adresse adresse;
  private List<Travaux> travaux;
  private List<Assurance> assurance;
  private Charges charges;
  private String refCadastrale;
  private boolean bati;
  private String numeroFiscal;
  private float taxeFonciere;
  private Location location;
  private Colocation colocation;
  private Loyer loyer;
  private int idBatiment;
  // private boolean bColocation;
  private float surfaceHabitable;
  private float surfaceTotale;

  public BienLouable(
      Adresse adresse,
      float surfaceHabitable,
      float surfaceTotal,
      String refCadastrale,
      boolean bati,
      String numeroFiscal,
      float taxeFonciere,
      Loyer loyer,
      Charges charges) {
    this.adresse = adresse;
    this.surfaceHabitable = surfaceHabitable;
    this.surfaceTotale = surfaceTotal;
    this.refCadastrale = refCadastrale;
    this.bati = bati;
    this.numeroFiscal = numeroFiscal;
    this.taxeFonciere = taxeFonciere;
    this.loyer = loyer;
    this.travaux = new ArrayList<Travaux>();
    this.assurance = new ArrayList<Assurance>();
    this.charges = charges;
  }

  public BienLouable(
      int id,
      Adresse adresse,
      String refCadastrale,
      boolean bati,
      String numeroFiscal,
      float taxeFonciere,
      Loyer loyer,
      Charges charges) {
    this.id = id;
    this.adresse = adresse;
    this.refCadastrale = refCadastrale;
    this.bati = bati;
    this.numeroFiscal = numeroFiscal;
    this.taxeFonciere = taxeFonciere;
    this.loyer = loyer;
    this.travaux = new ArrayList<Travaux>();
    this.assurance = new ArrayList<Assurance>();
    this.charges = charges;
  }

  public int getId() {
    return this.id;
  }

  // peut seulement être une location ou une colocation, pas les deux en même temps
  public void addLocation(Location location) {
    if (this.isColocation()) {
      throw new IllegalArgumentException(
          "Un bien ne peut pas être à la fois une location et une colocation");
    }
    if (this.isLocation()) {
      throw new IllegalArgumentException("Ce bien est déjà une location");
    }
    this.location = location;
    this.colocation = null;
    // this.bColocation = false;
  }

  public void addColocation(Colocation colocation) {
    if (this.isLocation()) {
      throw new IllegalArgumentException(
          "Un bien ne peut pas être à la fois une location et une colocation");
    }
    if (this.isColocation()) {
      throw new IllegalArgumentException("Ce bien est déjà une colocation");
    }
    this.colocation = colocation;
    this.location = null;
    // this.bColocation = true;
  }

  public Adresse getAdresse() {
    return this.adresse;
  }

  public String getRefCadastrale() {
    return this.refCadastrale;
  }

  public boolean isBati() {
    return this.bati;
  }

  public String getNumeroFiscal() {
    return this.numeroFiscal;
  }

  public float getTaxeFonciere() {
    return this.taxeFonciere;
  }

  public Boolean isColocation() {
    return this.colocation != null && this.location == null;
  }

  public Boolean isLocation() {
    return this.location != null && this.colocation == null;
  }

  public Boolean isVide() {
    return this.isLocation() ? this.location.getLocataires().size() == 0 : this.colocation != null ? this.colocation.getColocataires().size() == 0 : true;
  }

  public Location getLocation() {
    return this.location;
  }

  public Colocation getColocation() {
    return this.colocation;
  }

  public Loyer getLoyer() {
    return this.loyer;
  }

  public List<Travaux> getTravaux() {
    return this.travaux;
  }

  public List<Assurance> getAssurance() {
    return this.assurance;
  }

  public Charges getCharges() {
    return this.charges;
  }

  public void setCharges(Charges charges) {
    this.charges = charges;
  }

  public void setAdresse(Adresse adresse) {
    this.adresse = adresse;
  }

  public void setRefCadastrale(String refCadastrale) {
    this.refCadastrale = refCadastrale;
  }

  public void setBati(boolean bati) {
    this.bati = bati;
  }

  public void setNumeroFiscal(String numeroFiscal) {
    this.numeroFiscal = numeroFiscal;
  }

  public void setTaxeFonciere(float taxeFonciere) {
    this.taxeFonciere = taxeFonciere;
  }

  public void setLoyer(Loyer loyer) {
    this.loyer = loyer;
  }

  public void addTravaux(Travaux travaux) {
    this.travaux.add(travaux);
  }

  public void addAssurance(Assurance assurance) {
    this.assurance.add(assurance);
  }

  public void removeTravaux(Travaux travaux) {
    this.travaux.remove(travaux);
  }

  public void removeAssurance(Assurance assurance) {
    this.assurance.remove(assurance);
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setIdBatiment(int idBatiment) {
    this.idBatiment = idBatiment;
  }

  public int getIdBatiment() {
    return this.idBatiment;
  }

  public abstract float surfaceTotale();

  public float totalCoutAssurance() {
    float total = 0F;
    for (Assurance a : this.getAssurance()) {
      total += a.cout();
    }
    return total;
  }

  public float getSurfaceHabitable() {
    return this.surfaceHabitable;
  }

  // return la surface totale du logement

  public float getSurfaceTotale() {
    return this.surfaceTotale;
  }

  public void setSurfaceTotale(float surfaceTotale) {
    this.surfaceTotale = surfaceTotale;
  }

  public void setSurfaceHabitable(float surfaceHabitable) {
    this.surfaceHabitable = surfaceHabitable;
  }
}
