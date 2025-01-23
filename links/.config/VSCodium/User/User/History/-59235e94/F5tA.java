package vues.mesDocuments;

import java.awt.GridLayout;

import javax.swing.JFrame;
import javax.swing.JTextArea;

import jdbc.SharedState;
import modele.Logement;
import modele.Personne;
import modele.Proprietaire;

public class EditRegularisationDesCharges extends JFrame {

  public EditRegularisationDesCharges(Logement bien, float nouvellesProvisions, float restantDu) {
    if (bien.isLocation()) {
      // En Location
      editRegularisationDesChargesLocataires(bien, nouvellesProvisions, restantDu);
    } else if (bien.isColocation()) {
      // TODO: fix the window not displaying all of the colocataires
      for (Personne p : bien.getColocation().getColocataires()) {
        editRegularisationDesChargesColocataires(bien, nouvellesProvisions, restantDu, p);
      }
    }
  }

  public void infoProprietaire(StringBuilder infoProprio) {
    Proprietaire proprietaire = SharedState.getInstance().getProprietaire();
    infoProprio.append("Bailleur : \n");
    infoProprio.append(
        "Nom / Prénom du bailleur : "
            + proprietaire.getNom()
            + " "
            + proprietaire.getPrenom()
            + "\n");
    infoProprio.append("Domicile ou siège social : " + proprietaire.getAdresse() + "\n");
    infoProprio.append("Qualité du bailleur : personne physique \n");
    infoProprio.append("Adresse email (facultatif) : " + proprietaire.getMail() + "\n");
    infoProprio.append("Téléphone (facultatif) : " + proprietaire.getTelephone() + "\n");

    infoProprio.append("\n");
  }

  public void editRegularisationDesChargesLocataires(
      Logement bien, float nouvellesProvisions, float restantDu) {
    StringBuilder infosRegul = new StringBuilder("");

    setTitle("Régularisation des charges");
    setSize(600, 500);
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setLocationRelativeTo(null);
    setLayout(new GridLayout(1, 1));

    infoProprietaire(infosRegul);

    infosRegul.append("Locataire : \n");
    // TODO: Fix the location being null
    if (bien.getLocation() != null) {
      for (Personne p : bien.getLocation().getLocataires()) {
        infosRegul.append("Nom: " + p.getNom() + " Prénom: " + p.getPrenom());
        infosRegul.append("\n");
        infosRegul.append("Adresse email (facultatif) : " + p.getEmail() + "\n");
        infosRegul.append("Téléphone (facultatif) : " + p.getTelephone() + "\n");
      }
    } else {
      infosRegul.append("Vacant");
    }
    infosRegul.append("\n");
    infosRegul.append("Localisation du logement : " + bien.getAdresse() + "\n");
    if (bien.getLoyer() != null)
      infosRegul.append("Montant du loyer : " + bien.getLoyer().getMontantHorsCharge() + "€\n");
    if (bien.getCharges() != null)
      infosRegul.append(
          "Provision sur charges : " + bien.getCharges().getProvisionSurCharge() + "\n");

    infosRegul.append(
        "Veuillez prendre connaissance de la régularisation des charges concernant votre logement : \n");
    if (restantDu > 0) {
      infosRegul.append("Vous devez " + restantDu + " €\n");
    } else if (restantDu < 0) {
      infosRegul.append("Nous vous devons " + restantDu + " €\n");
    }

    if (bien.getCharges().provisionSurChargeAnnuel() < nouvellesProvisions) {
      infosRegul.append(
          "Nous vous informons également que les provisions sur charges ont augmenté pour l'année à venir et passeront de "
              + bien.getCharges().provisionSurChargeAnnuel()
              + " € à "
              + nouvellesProvisions
              + " par an soit une augmentation de "
              + (nouvellesProvisions - bien.getCharges().provisionSurChargeAnnuel()) / 12
              + " € par mois\n");
    } else if (bien.getCharges().provisionSurChargeAnnuel() > nouvellesProvisions) {
      infosRegul.append(
          "Nous vous informons également que les provisions sur charges ont diminué pour l'année à venir et passeront de "
              + bien.getCharges().provisionSurChargeAnnuel()
              + " € à "
              + nouvellesProvisions
              + " par an soit une diminution de "
              + (bien.getCharges().provisionSurChargeAnnuel() - nouvellesProvisions) / 12
              + " € par mois\n");
    } else {
      infosRegul.append(
          "Nous vous informons également que les provisions sur charges pour l'année à venir restent les mêmes que l'année passée soit "
              + bien.getCharges().provisionSurChargeAnnuel()
              + " € par an\n");
    }

    JTextArea textArea = new JTextArea(infosRegul.toString());
    textArea.setEditable(false);
    textArea.setLineWrap(true);
    textArea.setWrapStyleWord(true);
    add(textArea);
  }

  public void editRegularisationDesChargesColocataires(
      Logement bien, float nouvellesProvisions, float restantDu, Personne p) {
    StringBuilder infosRegul = new StringBuilder("");

    setTitle("Régularisation des charges");
    setSize(600, 500);
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setLocationRelativeTo(null);
    setLayout(new GridLayout(1, 1));

    infoProprietaire(infosRegul);

    infosRegul.append("Locataire : \n");
    infosRegul.append("Nom: " + p.getNom() + " Prénom: " + p.getPrenom());
    infosRegul.append("\n");
    infosRegul.append("Adresse email (facultatif) : " + p.getEmail() + "\n");
    infosRegul.append("Téléphone (facultatif) : " + p.getTelephone() + "\n");

    infosRegul.append("\n");
    infosRegul.append("Localisation du logement : " + bien.getAdresse() + "\n");
    if (bien.getLoyer() != null)
      infosRegul.append(
          "Montant du loyer : "
              + bien.getLoyer().getMontantHorsCharge()
                  / bien.getColocation().getColocataires().size()
              + "€\n");
    if (bien.getCharges() != null)
      infosRegul.append(
          "Provision sur charges : "
              + bien.getCharges().getProvisionSurCharge()
                  / bien.getColocation().getColocataires().size()
              + "\n");

    infosRegul.append(
        "Veuillez prendre connaissance de la régularisation des charges concernant votre logement : \n");
    if (restantDu > 0) {
      infosRegul.append(
          "Vous devez " + restantDu / bien.getColocation().getColocataires().size() + " €\n");
    } else if (restantDu < 0) {
      infosRegul.append(
          "Nous vous devons " + restantDu / bien.getColocation().getColocataires().size() + " €\n");
    }

    if (bien.getCharges().provisionSurChargeAnnuel() < nouvellesProvisions) {
      infosRegul.append(
          "Nous vous informons également que les provisions sur charges ont augmenté pour l'année à venir et passeront de "
              + bien.getCharges().provisionSurChargeAnnuel()
                  / bien.getColocation().getColocataires().size()
              + " € à "
              + nouvellesProvisions / bien.getColocation().getColocataires().size()
              + " par an soit une augmentation de "
              + ((nouvellesProvisions - bien.getCharges().provisionSurChargeAnnuel()) / 12)
                  / bien.getColocation().getColocataires().size()
              + " € par mois\n");
    } else if (bien.getCharges().provisionSurChargeAnnuel() > nouvellesProvisions) {
      infosRegul.append(
          "Nous vous informons également que les provisions sur charges ont diminué pour l'année à venir et passeront de "
              + bien.getCharges().provisionSurChargeAnnuel()
                  / bien.getColocation().getColocataires().size()
              + " € à "
              + nouvellesProvisions / bien.getColocation().getColocataires().size()
              + " par an soit une diminution de "
              + ((bien.getCharges().provisionSurChargeAnnuel() - nouvellesProvisions) / 12)
                  / bien.getColocation().getColocataires().size()
              + " € par mois\n");
    } else {
      infosRegul.append(
          "Nous vous informons également que les provisions sur charges pour l'année à venir restent les mêmes que l'année passée soit "
              + bien.getCharges().provisionSurChargeAnnuel()
                  / bien.getColocation().getColocataires().size()
              + " € par an\n");
    }

    JTextArea textArea = new JTextArea(infosRegul.toString());
    textArea.setEditable(false);
    textArea.setLineWrap(true);
    textArea.setWrapStyleWord(true);
    add(textArea);
  }
}
