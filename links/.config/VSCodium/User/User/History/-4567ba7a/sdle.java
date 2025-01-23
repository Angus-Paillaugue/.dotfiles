package modele;

import java.util.Objects;

public class Adresse {
  private int id;
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

  public Adresse(int id, String numero, String rue, String complement, String ville, String cp) {
    this.id = id;
    this.numero = numero.trim();
    this.rue = rue.trim();
    this.complement = complement.trim();
    this.ville = ville.trim();
    this.cp = cp.trim();
  }

  public Adresse(int id, String numero, String rue, String ville, String cp) {
    this.id = id;
    this.numero = numero.trim();
    this.rue = rue.trim();
    this.ville = ville.trim();
    this.cp = cp.trim();
  }

  @Override
  public int hashCode() {
    return Objects.hash(complement, cp, id, numero, rue, ville);
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null) return false;
    if (getClass() != obj.getClass()) return false;
    Adresse other = (Adresse) obj;
    return Objects.equals(complement, other.complement)
        && Objects.equals(cp, other.cp)
        && Objects.equals(id, other.id)
        && Objects.equals(numero, other.numero)
        && Objects.equals(rue, other.rue)
        && Objects.equals(ville, other.ville);
  }

  public int getId() {
    return this.id;
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

  public void setId(int id) {
    this.id = id;
  }

  @Override
  public String toString() {
    return (this.getNumero()
        + " "
        + this.getRue()
        + this.getVille()
        + " "
        + this.getCp());
  }
}
