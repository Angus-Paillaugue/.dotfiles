public class Immeuble extends ObjetGraphique {

  private String couleur;
  private int nbEtages;
  private int hauteurEtage;

  public Immeuble(int x, int y, String couleur, int nbEtages, int hauteurEtage) {
    super(x, y);
    this.couleur = couleur;
    this.nbEtages = nbEtages;
    this.hauteurEtage = hauteurEtage;
  }

  public void setCouleur(String couleur) {
    this.couleur = couleur;
  }

  public void setHauteurEtage(int hauteurEtage) {
    this.hauteurEtage = hauteurEtage;
  }

  public void setNbEtages(int nbEtages) {
    this.nbEtages = nbEtages;
  }

  @Override
  public String toString() {
    return "Immeuble [couleur=" + couleur + ", nbEtages=" + nbEtages + ", hauteurEtage=" + hauteurEtage
        + super.toString() + "]";
  }
}
