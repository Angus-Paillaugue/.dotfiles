package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JComponent;

import dao.GarantDAO;
import vues.AjouterGarant;
import vues.ProfilLocataire;
import vues.composants.ModalDanger;

public class ProfilLocataireControleur implements ActionListener {
	private ProfilLocataire vue;

	public ProfilLocataireControleur(ProfilLocataire vue) {
	    this.vue = vue;
	  }

	@Override
	public void actionPerformed(ActionEvent e) {
		JComponent target = (JComponent) e.getSource();

		if (target.getName() != null && target.getName().equals("addGarant")) {
			this.vue.dispose();
			AjouterGarant ajtGarant = new AjouterGarant(this.vue.personne, this.vue.location, isColocation);
			ajtGarant.setVisible(true);

		} else if (target.getName() != null && target.getName().equals("suppAllGarants")) {
			try {
				GarantDAO garantDAO = new GarantDAO();
				garantDAO.supprimerTousLesGarants(this.vue.location, );
				new ProfilLocataire(this.vue.personne, this.vue.location, false).setVisible(true);
				this.vue.dispose();
			} catch (Exception ex) {
				System.out.println(ex);
		        new ModalDanger("Erreur", ex.getMessage(), true).setVisible(true);
			}


		} else if (target.getName() != null && target.getName().equals("suppOneGarant")) {
			try {
				GarantDAO garantDAO = new GarantDAO();
				garantDAO.supprimerGarant(this.vue.personne, this.vue.location, isColocation);
				new ProfilLocataire(this.vue.personne, this.vue.location, false).setVisible(true);
		        this.vue.dispose();
			} catch (Exception ex) {
				System.out.println(ex);
		        new ModalDanger("Erreur", ex.getMessage(), true).setVisible(true);
			}
		} else if (target.getName() != null && target.getName().equals("retourBtn")) {
			new ProfilLocataire(this.vue.personne, this.vue.location, false).setVisible(true);
	        this.vue.dispose();
		}

	}




}
