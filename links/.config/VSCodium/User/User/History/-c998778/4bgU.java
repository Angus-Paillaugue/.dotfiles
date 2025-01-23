package modele;

public class Assurance {
  private String typeContrat;
  private String nomAssureur;
  private int numeroContrat;
  private float prime;

  public Assurance(
      String typeContrat, String nomAssureur, int numeroContrat, float prime) {
    this.typeContrat = typeContrat;
    this.nomAssureur = nomAssureur;
    this.numeroContrat = numeroContrat;
    this.prime = prime;
  }

  public String getTypeContrat() {
    return this.typeContrat;
  }

  public String getNomAssureur() {
    return this.nomAssureur;
  }

  public int getNumeroContrat() {
    return this.numeroContrat;
  }

  public float getPrime() {
    return this.prime;
  }

  public void setTypeContrat(String typeContrat) {
    this.typeContrat = typeContrat;
  }

  public void setNomAssureur(String nomAssureur) {
    this.nomAssureur = nomAssureur;
  }

  public void setNumeroContrat(int numeroContrat) {
    this.numeroContrat = numeroContrat;
  }

  public void setPrime(float prime) {
    this.prime = prime;
  }

}
