package modele;

public class Adresse {
  private String numero;
  private String rue;
  private String complement;
  private String ville;
  private String cp;

  // Constructeur sans un complement d'adresse
  public Adresse(String numero, String rue, String ville, String cp) {
    this.numero = numero;
    this.rue = rue;
    this.ville = ville;
    this.cp = cp;
  }

  // Constructeur avec un complement d'adresse
  public Adresse(String numero, String rue, String complement, String ville, String cp) {
    this.numero = numero;
    this.rue = rue;
    this.complement = complement;
    this.ville = ville;
    this.cp = cp;
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

  @Override
  public String toString() {
    return (this.getNumero()
        + " "
        + this.getRue()
        + " "
        + (this.getComplement() != null ? this.getComplement()
        + " " : "")
        + this.getVille()
        + " "
        + this.getCp());
  }
}
