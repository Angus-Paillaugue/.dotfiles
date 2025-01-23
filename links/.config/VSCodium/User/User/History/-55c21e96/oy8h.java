package vues.mesDocuments;

import java.awt.GridLayout;
import java.util.List;

import javax.swing.JFrame;
import javax.swing.JTextArea;

import jdbc.SharedState;
import modele.BienLouable;
import modele.Personne;
import modele.Proprietaire;

public class ContractDeLocation extends JFrame {
  private static final long serialVersionUID = 1L;

  public ContractDeLocation(BienLouable bien) {
    if (bien.isLocation() && !bien.isColocation()) {
      // En Location
      editContratDeLocation(bien);
    } else if (!bien.isLocation() && bien.isColocation()) {
      // personne est non nulle, on gère une colocation et un contrat unique pour une
      // personne
      editContratDeColocation(bien, personne);
    }
  }

  public void editContratDeLocation(BienLouable bien) {
    StringBuilder infosContrat = new StringBuilder("");
    Proprietaire proprietaire = SharedState.getInstance().getProprietaire();

    setTitle("Contract de location");
    setSize(600, 500);
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setLocationRelativeTo(null);
    setLayout(new GridLayout(1, 1));

    infosContrat.append("Bailleur : \n");
    infosContrat.append(
        "Nom / Prénom du bailleur : "
            + proprietaire.getNom()
            + " "
            + proprietaire.getPrenom()
            + "\n");
    infosContrat.append("Domicile ou siège social : " + proprietaire.getAdresse() + "\n");
    infosContrat.append("Qualité du bailleur : personne physique \n");
    infosContrat.append("Adresse email (facultatif) : " + proprietaire.getMail() + "\n");
    infosContrat.append("Téléphone (facultatif) : " + proprietaire.getTelephone() + "\n");

    infosContrat.append("\n");
    infosContrat.append("Locataire : \n");
    infosContrat.append("Nom / Prénom du/des locataire(s) : \n");
    for (Personne p : bien.getLocation().getLocataires()) {
      infosContrat.append(p.getNom() + " " + p.getPrenom());
      infosContrat.append("\n");
      infosContrat.append(
          "Adresse email (facultatif) : "
              + bien.getLocation().getLocataires().get(0).getEmail()
              + "\n");
      infosContrat.append(
          "Téléphone (facultatif) : "
              + bien.getLocation().getLocataires().get(0).getTelephone()
              + "\n");
    }
    infosContrat.append("\n");
    infosContrat.append("Localisation du logement : " + bien.getAdresse() + "\n");
    if(bien.getLoyer() != null) infosContrat.append("Montant du loyer : " + bien.getLoyer().getMontantHorsCharge() + "€\n");
    if (bien.getCharges() != null) infosContrat.append(
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
    Proprietaire proprietaire = SharedState.getInstance().getProprietaire();

    setTitle("Contrat de colocation");
    setSize(600, 500);
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setLocationRelativeTo(null);
    setLayout(new GridLayout(1, 1));

    infosContrat.append("Bailleur : \n");
    infosContrat.append(
        "Nom / Prénom du bailleur : "
            + proprietaire.getNom()
            + " "
            + proprietaire.getPrenom()
            + "\n");
    infosContrat.append("Domicile ou siège social : " + proprietaire.getAdresse() + "\n");
    infosContrat.append("Qualité du bailleur : personne physique \n");
    infosContrat.append("Adresse email (facultatif) : " + proprietaire.getMail() + "\n");
    infosContrat.append("Téléphone (facultatif) : " + proprietaire.getTelephone() + "\n");

    infosContrat.append("\n");
    infosContrat.append("Colocataire : \n");
    infosContrat.append("Nom / Prénom du/des locataire(s) : ");
    infosContrat.append(colocataire.getNom() + " " + colocataire.getPrenom());
    infosContrat.append(" ");
    infosContrat.append("\n");
    infosContrat.append("Adresse email (facultatif) : " + colocataire.getEmail() + "\n");
    infosContrat.append("Téléphone (facultatif) : " + colocataire.getTelephone() + "\n");
    infosContrat.append("Localisation du logement : " + bien.getAdresse() + "\n");
    infosContrat.append("Montant du loyer : " + bien.getLoyer().getMontantHorsCharge() + "€\n");
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
