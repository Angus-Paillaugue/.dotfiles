package contracts;

import java.awt.EventQueue;
import java.awt.GridLayout;
import javax.swing.JFrame;
import javax.swing.JTextArea;


import vues.AppTheme;
import vues.Constants;
import modele.BienLouable; // Add this import statement
import modele.Personne;

public class ContractDeLocation extends JFrame {
  	private static final long serialVersionUID = 1L;

	public static void main(String[] args) {
		AppTheme.setup();
		EventQueue.invokeLater(
				() -> {
					try {
						ContractDeLocation frame = new ContractDeLocation(Constants.proprietaire.getBatiment().get(0).getBiensLouables().get(0));
						frame.setVisible(true);
					} catch (Exception e) {
						e.printStackTrace();
					}
				});
	}

	public ContractDeLocation(BienLouable bien) {
	    StringBuilder infosContrat = new StringBuilder("");

	    setTitle("Contract de location");
	    setSize(800, 600);
	    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	    setLocationRelativeTo(null);
	    setLayout(new GridLayout(0, 2)); // Use GridLayout for simplicity

	    infosContrat.append("Nom / Prénom du bailleur : " + Constants.proprietaire.getNom() + " " + Constants.proprietaire.getPrenom() + "\n");
	    infosContrat.append("Domicile ou siège social : " + Constants.proprietaire.getAdresse() + "\n");
	    infosContrat.append("Qualité du bailleur : personne physique \n");
	    infosContrat.append("Adresse email (facultatif) : " + Constants.proprietaire.getMail() + "\n");
	    infosContrat.append("Téléphone (facultatif) : " + Constants.proprietaire.getTelephone() + "\n");

	    infosContrat.append("Nom / Prénom du/des locataire(s) : ");
	    for (Personne p : bien.getLocation().getLocataires()) {
	    	infosContrat.append(p.getNom() + " " + p.getPrenom());
	    	infosContrat.append(" ");
	    }
	    infosContrat.append("\n");
	    infosContrat.append("Adresse email (facultatif) : " + bien.getLocation().getLocataires().get(0).getEmail() + "\n");
	    infosContrat.append("Téléphone (facultatif) : " + bien.getLocation().getLocataires().get(0).getTelephone() + "\n");
	    infosContrat.append("Localisation du logement : " + bien.getAdresse() + "\n");
	    infosContrat.append("Montant du loyer : " + bien.getLoyer().getMontantHorsCharge() + "€\n");
	    infosContrat.append("Provision sur charges : " + bien.getCharges() + "\n")
;

	    JTextArea textArea = new JTextArea(infosContrat.toString());
	    textArea.setEditable(false);
	    textArea.setLineWrap(true);
	    textArea.setWrapStyleWord(true);
	    add(textArea);

	}
}
