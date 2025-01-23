package modele;

public class Adresse {
  private String numero;
  private String rue;
  private String complement;
  private String ville;
  private String cp;

  // Constructeur sans un complement d'adresse
  public Adresse(String numero, String rue, String ville, String cp) {
    this.numero = numero.trim();
    this.rue = rue.trim();
    this.ville = ville.trim();
    this.cp = cp.trim();
  }

  // Constructeur avec un complement d'adresse
  public Adresse(String numero, String rue, String complement, String ville, String cp) {
    this.numero = numero.trim();
    this.rue = rue.trim();
    this.complement = complement.trim();
    this.ville = ville.trim();
    this.cp = cp.trim();
  }

  public String getNumero() {
    return this.numero;
  }

  public String getRue() {
    return this.rue;
  }

  public String getComplement() {
    return this.complement;
  }

  public String getVille() {
    return this.ville;
  }

  public String getCp() {
    return this.cp;
  }

  public void setNumero(String numero) {
    this.numero = numero;
  }

  public void setRue(String rue) {
    this.rue = rue;
  }

  public void setComplement(String complement) {
    this.complement = complement;
  }

  public void setVille(String ville) {
    this.ville = ville;
  }

  public void setCp(String cp) {
    this.cp = cp;
  }

  @Override
  public String toString() {
    return (this.getNumero()
        + " "
        + this.getRue()
        + " "
        + (this.getComplement() != null ? this.getComplement() + " " : "")
        + this.getVille()
        + " "
        + this.getCp());
  }
}
