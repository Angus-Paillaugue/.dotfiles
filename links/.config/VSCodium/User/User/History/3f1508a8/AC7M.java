package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import vues.GenererContractDeLocation;
import javax.swing.JComponent;

public class GenererContractDeLocationControleur implements ActionListener {
	private GenererContractDeLocation vue;

	public GenererContractDeLocationControleur(GenererContractDeLocation vue) {
		this.vue = vue;
	}

	public void actionPerformed(ActionEvent e) {
		JComponent target = (JComponent) e.getSource();
		if (target.getName() != null && target.getName().equals("genererButton")) {
			System.out.println("Generer button clicked");
		} else {
			// Radio button selected
			this.vue.genererButton.setEnabled(true);
		}
	}
}
