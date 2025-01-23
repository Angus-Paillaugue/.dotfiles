public class Arbre extends ObjetGraphique {

  private int hauteur;
  private String couleurTronc;
  private String couleurFeuilles;

  public Arbre(int x, int y, int hauteur, String couleurTronc, String couleurFeuilles) {
    super(x, y);
    this.hauteur = hauteur;
    this.couleurTronc = couleurTronc;
    this.couleurFeuilles = couleurFeuilles;
  }

  public void setHauteur(int hauteur) {
    this.hauteur = hauteur;
  }

  public void setCouleurFeuilles(String couleurFeuilles) {
    this.couleurFeuilles = couleurFeuilles;
  }

  public void setCouleurTronc(String couleurTronc) {
    this.couleurTronc = couleurTronc;
  }

  @Override
  public String toString() {
    return "Arbre [hauteur=" + hauteur + ", couleurTronc=" + couleurTronc + ", couleurFeuilles=" + couleurFeuilles
        + super.toString() + "]";
  }

}
