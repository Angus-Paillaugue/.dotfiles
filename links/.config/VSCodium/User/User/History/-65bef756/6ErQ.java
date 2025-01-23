public class Immeuble extends ObjetGraphique implements Cloneable {

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

  @Override
  protected Object clone() throws CloneNotSupportedException {
    Immeuble personne = null;
      personne = (Immeuble) super.clone();

    // On clone l'attribut de type Patronyme qui n'est pas immuable.
    personne.patronyme = (Immeuble) Immeuble.clone();

    // on renvoie le clone
    return personne;
  }
}
