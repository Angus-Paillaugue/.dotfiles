public class Immeuble extends ObjetGraphique {

  private String couleur;
  private int nbEtages;
  private int hauteurEtage;

  public Immeuble(int x, int y, String couleur, int nbEtages, int heuteurEtage) {
    super(x, y);
    this.couleur = couleur;
    this.nbEtages = nbEtages;
    this.hauteurEtage = heuteurEtage;
  }
}
