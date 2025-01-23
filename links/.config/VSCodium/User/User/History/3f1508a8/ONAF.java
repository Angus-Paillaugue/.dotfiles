package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import vues.GenererContractDeLocation;
import javax.swing.JComponent;
import javax.swing.JRadioButton;

public class GenererContractDeLocationControleur implements ActionListener {
	private GenererContractDeLocation vue;

	public GenererContractDeLocationControleur(GenererContractDeLocation vue) {
		this.vue = vue;
	}

	public void actionPerformed(ActionEvent e) {
		JComponent target = (JComponent) e.getSource();
		if (target.getName() != null && target.getName().equals("genererButton")) {
			// Generate button clicked
			System.out.println("Generer button clicked");
			for(int i = 0; i < this.vue.radioPanel.getComponentCount(); i++) {
				JRadioButton radio = (JRadioButton) this.vue.radioPanel.getComponent(i);
				if(radio.isSelected()) {
					Integer idLocataire = Integer.parseInt(radio.getName());
					System.out.println("Id locataire : " + idLocataire);
				}
			}
		} else {
			// Radio button selected
			this.vue.genererButton.setEnabled(true);	
		}
	}
}
