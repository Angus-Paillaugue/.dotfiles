package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JComponent;

import composants.ModalSuccess;
import modele.Adresse;
import modele.Batiment;
import vues.AjouterBatiment;
import vues.Constants;
import vues.MesAppartements;
import utils.VuesUtils;
import utils.Logger;
import modele.TypeDeBatiment;

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

				TypeDeBatiment type = TypeDeBatiment.valueOf(VuesUtils.getInputValue(this.vue.mainPanel, "typeBatiment"));

				String numeroFiscal = VuesUtils.getInputValue(this.vue.mainPanel, "numeroFiscal");

				Batiment batiment = new Batiment(
					type,
					adresse,
					numeroFiscal
				);

				Constants.proprietaire.addBatiment(batiment);

				Logger.log(batiment);

				this.vue.dispose();
				new MesAppartements(Constants.proprietaire).setVisible(true);
				new ModalSuccess("Success", "Bâtiment ajouté avec success!", true).setVisible(true);
			} catch (Exception ex) {
				Logger.error(ex);
			}
		}
	}
}
