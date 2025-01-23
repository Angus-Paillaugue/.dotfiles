package jdbc;

import modele.Proprietaire;

public class SharedState {
  private Proprietaire proprietaire;

  private static SharedState instance;

  private SharedState() {
  }

  public static SharedState getInstance() {
    if (instance == null) {
      instance = new SharedState();
    }
    return instance;
  }

  public Proprietaire getProprietaire() {
    return proprietaire;
  }

  public void setProprietaire(Proprietaire proprietaire) {
    this.proprietaire = proprietaire;
  }

  public void clear() {
    this.proprietaire = null;
  }
}
