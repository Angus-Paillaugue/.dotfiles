package modele;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Proprietaire {
  @Override
  public String toString() {
    return "Proprietaire [id="
        + id
        + ", passwordHash="
        + passwordHash
        + ", nom="
        + nom
        + ", prenom="
        + prenom
        + ", adresse="
        + adresse
        + ", mail="
        + mail
        + ", telephone="
        + telephone
        + ", batiment="
        + batiment
        + "]";
  }

  @Override
  public int hashCode() {
    return Objects.hash(adresse, batiment, id, mail, nom, passwordHash, prenom, telephone);
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null) return false;
    if (getClass() != obj.getClass()) return false;
    Proprietaire other = (Proprietaire) obj;
    return Objects.equals(adresse, other.adresse)
        && Objects.equals(batiment, other.batiment)
        && Objects.equals(mail, other.mail)
        && Objects.equals(nom, other.nom)
        && Objects.equals(passwordHash, other.passwordHash)
        && Objects.equals(prenom, other.prenom)
        && Objects.equals(telephone, other.telephone);
  }

  private int id;
  private String passwordHash;
  private String nom;
  private String prenom;
  private Adresse adresse;
  private String mail;
  private String telephone;
  private List<Batiment> batiment;

  public Proprietaire(String nom, String prenom, Adresse adresse, String mail, String telephone) {
    this.nom = nom;
    this.prenom = prenom;
    this.adresse = adresse;
    this.mail = mail;
    this.telephone = telephone;
    this.batiment = new ArrayList<Batiment>();
  }

  public Proprietaire(
      int id,
      String nom,
      String prenom,
      Adresse adresse,
      String mail,
      String telephone,
      String passwordHash) {
    this.id = id;
    this.passwordHash = passwordHash;
    this.nom = nom;
    this.prenom = prenom;
    this.adresse = adresse;
    this.mail = mail;
    this.telephone = telephone;
    this.batiment = new ArrayList<Batiment>();
  }

  public int getId() {
    return this.id;
  }

  public String getPasswordHash() {
    return this.passwordHash;
  }

  public String getNom() {
    return this.nom;
  }

  public String getPrenom() {
    return this.prenom;
  }

  public Adresse getAdresse() {
    return this.adresse;
  }

  public String getMail() {
    return this.mail;
  }

  public String getTelephone() {
    return this.telephone;
  }

  public List<Batiment> getBatiment() {
    return this.batiment;
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setNom(String nom) {
    this.nom = nom;
  }

  public void setPrenom(String prenom) {
    this.prenom = prenom;
  }

  public void setAdresse(Adresse adresse) {
    this.adresse = adresse;
  }

  public void setMail(String mail) {
    this.mail = mail;
  }

  public void setTelephone(String telephone) {
    this.telephone = telephone;
  }

  public void setPasswordHash(String passwordHash) {
    this.passwordHash = passwordHash;
  }

  // Permet d'ajouter un batiment à la liste des batiment du propriétaire.
  public void addBatiment(Batiment batiment) {
    this.getBatiment().add(batiment);
  }

  public void addLogement(Logement logement, Batiment batiment) {
    int index = this.batiment.indexOf(batiment);
    System.out.println("index: " + index);
    if (index == -1) {
      return;
    }
    this.batiment.get(index).addBienLouable(logement);
  }

  public Batiment getBatiment(Batiment b) {
    for (Batiment bat : this.getBatiment()) {
      System.out.println(bat.getId() + " | " + b.getId());
      if (bat.getId() == b.getId()) {
        return bat;
      }
    }
    return null;
  }

  public List<String> adressebiensLouables() {
    List<String> biens = new ArrayList<String>();
    for (Batiment bat : this.getBatiment()) {
      for (BienLouable bien : bat.getBiensLouables()) {
        biens.add(bien.getAdresse().toString());
      }
    }
    return biens;
  }
}
