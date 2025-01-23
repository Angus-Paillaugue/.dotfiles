package controleurs;


import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;

import vues.Constants;
import vues.MesAppartements;
import vues.SupprimerLocataire;

public class ControleurSupprimerLocataire implements ActionListener {

	private SupprimerLocataire vue;

	public ControleurSupprimerLocataire(SupprimerLocataire vue) {
		this.vue = vue;
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		JButton target = (JButton) e.getSource();
		if (target.getName().equals("suppButton")) {

		} else if (target.getName().equals("cancelButton")) {
			vue.dispose();
			new MesAppartements().setVisible(true);
		}

	}

}
