package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JComponent;

import modele.Adresse;
import vues.AjouterBatiment;
import vues.Constants;
import vues.MesAppartements;
import utils.VuesUtils;
import utils.Logger;

public class AjouterBatimentControleur implements ActionListener{
	private AjouterBatiment vue;

	public AjouterBatimentControleur(AjouterBatiment vue) {
		this.vue = vue;
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		JComponent target = (JComponent) e.getSource();

		if(target.getName() != null && target.getName().equals("cancel")) {
			this.vue.dispose();
			new MesAppartements(Constants.proprietaire);
		}else {
			// Submit button clicked, create new location

			try {

				Adresse adresse = new Adresse(
					VuesUtils.getInputValue(this.vue.mainPanel, "adresseNumero"),
					VuesUtils.getInputValue(this.vue.mainPanel, "adresseRue"),
					VuesUtils.getInputValue(this.vue.mainPanel, "adresseVille"),
					VuesUtils.getInputValue(this.vue.mainPanel, "adresseCP")
				);
			} catch (Exception ex) {
				Logger.error(ex);
			}
		}
	}
}
