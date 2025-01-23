package vues.mesDocuments;

import java.awt.EventQueue;
import java.awt.GridLayout;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import javax.swing.JFrame;
import javax.swing.JTextArea;

import jdbc.SharedState;
import vues.AppTheme;
import modele.BienLouable;
import modele.Personne;
import modele.Proprietaire;

public class QuittanceDeLoyer extends JFrame {
  private static final long serialVersionUID = 1L;

  // La methode main ne sert qu'a tester la fenetre
  public static void main(String[] args) {
    AppTheme.setup();
    EventQueue.invokeLater(
        () -> {
          try {
            QuittanceDeLoyer frame =
                new QuittanceDeLoyer(
                    SharedState.getInstance()
                        .getProprietaire()
                        .getBatiment()
                        .get(0)
                        .getBiensLouables()
                        .get(0),
                    "11/2024");
            frame.setVisible(true);
          } catch (Exception e) {
            e.printStackTrace();
          }
        });
  }

  public QuittanceDeLoyer(BienLouable bien, String date) {
    if (bien.isLocation() && !bien.isColocation()) {
      editQuittanceLocation(bien, date);
    } else if (!bien.isLocation() && bien.isColocation()) {
      editQuittanceColocation(bien, date);
    }
  }

  public void editQuittanceLocation(BienLouable bien, String date) {
    StringBuilder infosQuittance = new StringBuilder("");
    Proprietaire proprietaire = SharedState.getInstance().getProprietaire();

    setTitle("Quittance de loyer");
    setSize(600, 500);
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setLocationRelativeTo(null);
    setLayout(new GridLayout(1, 1));

    infosQuittance.append("Quittance de loyer du mois de " + date + "\n");
    infosQuittance.append(
        "Nom/Prénom du bailleur : "
            + proprietaire.getNom()
            + " "
            + proprietaire.getPrenom()
            + "\n");
    infosQuittance.append("Nom / Prénom du/des locataire(s) : ");
    for (Personne p : bien.getLocation().getLocataires()) {
      infosQuittance.append(p.getNom() + " " + p.getPrenom());
      infosQuittance.append(" ");
    }
    infosQuittance.append("\n");
    infosQuittance.append("Adresse de location : " + bien.getAdresse() + "\n");
    infosQuittance.append("\n");

    LocalDate echeance;
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    if (bien.getLoyer() != null && bien.getLoyer().getJourVersement() < 10) {
      echeance = LocalDate.parse("0" + bien.getLoyer().getJourVersement() + "/" + date, formatter);
    } else {
      echeance = LocalDate.parse(bien.getLoyer().getJourVersement() + "/" + date, formatter);
    }
    LocalDate debut = echeance.minusMonths(1);
    infosQuittance.append(
        "Je soussigné "
            + proprietaire.getNom()
            + " "
            + proprietaire.getPrenom()
            + " propriétaire du logement désigné ci-dessus,"
            + "déclare avoir reçu de Monsieur / Madame "
            + bien.getLocation().getLocataires().get(0).getNom()
            + ", la somme de "
            + (bien.getLoyer().getMontantHorsCharge() + bien.getCharges().getProvisionSurCharge())
            + " euros, au titre du paiement du loyer et des charges pour la période de location du "
            + debut.format(formatter)
            + " au "
            + echeance.format(formatter)
            + "  et lui en donne quittance, sous réserve de tous mes droits."
            + "\n");
    infosQuittance.append("\n");
    infosQuittance.append("Detail du règlement : " + "\n");
    infosQuittance.append("Loyer : " + bien.getLoyer().getMontantHorsCharge() + " euros" + "\n");
    infosQuittance.append(
        "Provision pour charges : " + bien.getCharges().getProvisionSurCharge() + " euros" + "\n");
    infosQuittance.append(
        "Total : "
            + (bien.getLoyer().getMontantHorsCharge() + bien.getCharges().getProvisionSurCharge())
            + " euros"
            + "\n");
    infosQuittance.append("Date de paiment : " + echeance.format(formatter));
    JTextArea textArea = new JTextArea(infosQuittance.toString());
    textArea.setEditable(false);
    textArea.setLineWrap(true);
    textArea.setWrapStyleWord(true);
    add(textArea);
  }

  // A implémenter
  public void editQuittanceColocation(BienLouable bien, String date) {}
}
