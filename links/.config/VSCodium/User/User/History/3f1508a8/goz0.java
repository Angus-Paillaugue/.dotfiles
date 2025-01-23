package controleurs;

import java.awt.List;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.stream.Collectors;

import vues.Constants;
import vues.GenererContractDeLocation;
import vues.MesDocuments;
import javax.swing.JComponent;
import javax.swing.JRadioButton;

import contracts.ContractDeLocation;
import modele.BienLouable;

public class GenererContractDeLocationControleur implements ActionListener {
	private GenererContractDeLocation vue;

	public GenererContractDeLocationControleur(GenererContractDeLocation vue) {
		this.vue = vue;
	}

	public void actionPerformed(ActionEvent e) {
		JComponent target = (JComponent) e.getSource();

		if (target.getName() != null && target.getName().equals("cancelButton")) {
			// Cancel button clicked
			new MesDocuments().setVisible(true);
			this.vue.dispose();
		}else if (target.getName() != null && target.getName().equals("genererButton")) {
			// Generate button clicked
			for(int i = 0; i < this.vue.radioPanel.getComponentCount(); i++) {
				JRadioButton radio = (JRadioButton) this.vue.radioPanel.getComponent(i);
				if(radio.isSelected()) {
					Integer idLocataire = Integer.parseInt(radio.getName());
					System.out.println("Id locataire : " + idLocataire);
					List biens = Constants.proprietaire.getBatiment().stream().flatMap(bat -> bat.getBiensLouables().stream()).collect(Collectors.toList());
				}
			}
		} else {
			// Radio button selected
			this.vue.genererButton.setEnabled(true);
		}
	}
}
