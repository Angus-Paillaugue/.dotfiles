package modele;

import java.time.LocalDate;

public class Personne {
  private String nom;
  private String prenom;
  private int idLocataire;
  private LocalDate dateNaissance;
  private String lieuNaissance;
  private SituationFamiliale situationFamiliale;
  private String profession;
  private String employeur;
  private TypeDeContratDeTravail typeDeContratDeTravail;
  private float remunerationMensuelleNette;
  private float autresRevenus;
  private String email;
  private String telephone;
  private Adresse adresse;

  public Personne(
      String nom,
      String prenom,
      int idLocataire,
      LocalDate dateNaissance,
      String lieuNaissance,
      SituationFamiliale situationFamiliale,
      String profession,
      String employeur,
      TypeDeContratDeTravail typeDeContratDeTravail,
      float remunerationMensuelleNette,
      float autresRevenus,
      String email,
      String telephone,
      Adresse adresse) {
    this.nom = nom;
    this.prenom = prenom;
    this.idLocataire = idLocataire;
    this.dateNaissance = dateNaissance;
    this.lieuNaissance = lieuNaissance;
    this.situationFamiliale = situationFamiliale;
    this.profession = profession;
    this.employeur = employeur;
    this.typeDeContratDeTravail = typeDeContratDeTravail;
    this.remunerationMensuelleNette = remunerationMensuelleNette;
    this.autresRevenus = autresRevenus;
    this.email = email;
    this.telephone = telephone;
    this.adresse = adresse;
  }

  public String getNom() {
    return this.nom;
  }

  public String getPrenom() {
    return this.prenom;
  }

  public int getIdLocataire() {
    return this.idLocataire;
  }

  public LocalDate getDateNaissance() {
    return this.dateNaissance;
  }

  public String getLieuNaissance() {
    return this.lieuNaissance;
  }

  public SituationFamiliale getSituationFamiliale() {
    return this.situationFamiliale;
  }

  public String getProfession() {
    return this.profession;
  }

  public String getEmployeur() {
    return this.employeur;
  }

  public TypeDeContratDeTravail getTypeDeContratDeTravail() {
    return this.typeDeContratDeTravail;
  }

  public float getRemunerationMensuelleNette() {
    return this.remunerationMensuelleNette;
  }

  public float getAutresRevenus() {
    return this.autresRevenus;
  }

  public String getEmail() {
    return this.email;
  }

  public String getTelephone() {
    return this.telephone;
  }

  public Adresse getAdresse() {
    return this.adresse;
  }

  // retourne le motant des revenus totaux d'une personne.
  public float totalRevenus() {
    return this.getRemunerationMensuelleNette() + this.getAutresRevenus();
  }

  public String toString() {
    return this.nom + " " + this.prenom;
  }
}
