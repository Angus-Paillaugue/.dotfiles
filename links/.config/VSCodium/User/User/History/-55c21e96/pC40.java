package vues.mesDocuments;

import java.awt.GridLayout;

import javax.swing.JFrame;
import javax.swing.JTextArea;

import jdbc.SharedState;
import modele.BienLouable;
import modele.Logement;
import modele.Personne;
import modele.Proprietaire;

public class ContractDeLocation extends JFrame {
  private static final long serialVersionUID = 1L;

  public ContractDeLocation(Logement bien) {
    if (bien.isLocation()) {
      // En Location
      editContratDeLocation(bien);
    } else if (bien.isColocation()) {
      // TODO: fix the window not displaying all of the colocataires
      for (Personne p : bien.getColocation().getColocataires()) {
        editContratDeColocation(bien, p);
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

  public void editContratDeLocation(Logement bien) {
    StringBuilder infosContrat = new StringBuilder("");

    setTitle("Contract de location");
    setSize(600, 500);
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setLocationRelativeTo(null);
    setLayout(new GridLayout(1, 1));

    infoProprietaire(infosContrat);

    infosContrat.append("Locataire : \n");
    // TODO: Fix the location being null
    if (bien.getLocation() != null) {
      for (Personne p : bien.getLocation().getLocataires()) {
        infosContrat.append("Nom: " + p.getNom() + " Prénom: " + p.getPrenom());
        infosContrat.append("\n");
        infosContrat.append("Adresse email (facultatif) : " + p.getEmail() + "\n");
        infosContrat.append("Téléphone (facultatif) : " + p.getTelephone() + "\n");
      }
    } else {
      infosContrat.append("Vacant");
    }
    infosContrat.append("\n");
    infosContrat.append("Localisation du logement : " + bien.getAdresse() + "\n");
    if (bien.getLoyer() != null)
      infosContrat.append("Montant du loyer : " + bien.getLoyer().getMontantHorsCharge() + "€\n");
    if (bien.getCharges() != null)
      infosContrat.append(
          "Provision sur charges : " + bien.getCharges().getProvisionSurCharge() + "\n");

    JTextArea textArea = new JTextArea(infosContrat.toString());
    textArea.setEditable(false);
    textArea.setLineWrap(true);
    textArea.setWrapStyleWord(true);
    add(textArea);
  }

  // A implementer
  public void editContratDeColocation(BienLouable bien, Personne colocataire) {
    StringBuilder infosContrat = new StringBuilder("");

    setTitle("Contrat de colocation");
    setSize(600, 500);
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setLocationRelativeTo(null);
    setLayout(new GridLayout(1, 1));

    infoProprietaire(infosContrat);

    infosContrat.append("\n");
    infosContrat.append("Colocataire : \n");
    infosContrat.append("Nom / Prénom du/des locataire(s) : ");
    infosContrat.append(colocataire.getNom() + " " + colocataire.getPrenom());
    infosContrat.append(" ");
    infosContrat.append("\n");
    infosContrat.append("Adresse email (facultatif) : " + colocataire.getEmail() + "\n");
    infosContrat.append("Téléphone (facultatif) : " + colocataire.getTelephone() + "\n");
    infosContrat.append("Localisation du logement : " + bien.getAdresse() + "\n");
    infosContrat.append(
        "Montant du loyer : "
            + bien.getLoyer().getMontantHorsCharge() / bien.getColocation().getColocataires().size()
            + "€\n");
    infosContrat.append(
        "Provision sur charges : "
            + bien.getCharges().getProvisionSurCharge()
                / bien.getColocation().getColocataires().size()
            + "\n");

    JTextArea textArea = new JTextArea(infosContrat.toString());
    textArea.setEditable(false);
    textArea.setLineWrap(true);
    textArea.setWrapStyleWord(true);
    add(textArea);
  }
}
