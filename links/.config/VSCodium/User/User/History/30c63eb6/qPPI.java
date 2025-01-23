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

  @Override
  protected Object clone() throws CloneNotSupportedException {
    Immeuble emp = (Immeuble) super.clone();

    emp.couleur = couleur;
    emp.nbEtages = nbEtages;
    emp.hauteurEtage = hauteurEtage;

    return emp;
  }

  @Override
  public boolean equals(Object arg0) {
    if (arg0 == null) {
      return false;
    }
    if (arg0 == this) {
      return true;
    }
    if (arg0.getClass() != this.getClass()) {
      return false;
    }
    Immeuble obj = (Immeuble) arg0;
    return super.equals(arg0) && this.couleur.equals(obj.couleur) && this.nbEtages == obj.nbEtages
        && this.hauteurEtage == obj.hauteurEtage;
  }

}
