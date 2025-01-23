package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.time.LocalDate;

import javax.swing.JComponent;

import modele.Adresse;
import modele.Charges;
import modele.Loyer;
import modele.ModeDePaiment;
import modele.noteEnergetique;
import modele.Logement;
import vues.AjouterGarage;
import vues.Constants;
import vues.MesAppartements;
import utils.VuesUtils;

public class AjouterGarageControleur implements ActionListener{
	private AjouterGarage vue;

	public AjouterGarageControleur(AjouterGarage vue) {
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
			Adresse adresse = new Adresse(
				VuesUtils.getInputValue(this.vue.mainPanel, "adresseNumero"),
				VuesUtils.getInputValue(this.vue.mainPanel, "adresseRue"),
				VuesUtils.getInputValue(this.vue.mainPanel, "adresseVille"),
				VuesUtils.getInputValue(this.vue.mainPanel, "adresseCP")
			);

			float caution = Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "montantCaution"));

			String refCadastrale = VuesUtils.getInputValue(this.vue.mainPanel, "refCadastrale");

			Boolean bati = Boolean.parseBoolean(VuesUtils.getInputValue(this.vue.mainPanel, "bati"));

			float montantDepotGarantie = Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "montantDepotGarantie"));

			String numeroFiscal = VuesUtils.getInputValue(this.vue.mainPanel, "numeroFiscal");

			float taxeFonciere = Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "taxeFonciere"));

			Loyer loyer = new Loyer(
				Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "montantHorsCharge")),
				Integer.parseInt(VuesUtils.getInputValue(this.vue.mainPanel, "jourVersement")),
				LocalDate.now(),
				LocalDate.parse(VuesUtils.getInputValue(this.vue.mainPanel, "dateProchaineRevision")),
				ModeDePaiment.valueOf(VuesUtils.getInputValue(this.vue.mainPanel, "modeDePayment"))
			);

			Charges charges = new Charges(
				Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "nouvelIndexEau")),
				Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "orduresMenageres")),
				Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "entretienPartiesCommunes")),
				Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "eclairagePartiesCommunes")),
				Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "eauPartieFixe")),
				Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "prixEau")),
				Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "ancienIndexEau")),
				Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "provisionSurCharge"))
			);

			String typePorte = VuesUtils.getInputValue(this.vue.mainPanel, "typePorte");

			LocalDate datePermisConstruire = LocalDate.parse(VuesUtils.getInputValue(this.vue.mainPanel, "datePermisConstruire"));

			LocalDate dateConstruction = LocalDate.parse(VuesUtils.getInputValue(this.vue.mainPanel, "dateConstructionBatiment"));

			String constatAmiante = VuesUtils.getInputValue(this.vue.mainPanel, "constatAmiante");

			String constatPlomb = VuesUtils.getInputValue(this.vue.mainPanel, "constatPlomb");

			String constatElectricite = VuesUtils.getInputValue(this.vue.mainPanel, "constatElectricite");

			noteEnergetique constatEnergetique = noteEnergetique.valueOf(VuesUtils.getInputValue(this.vue.mainPanel, "constatEnergetique"));

			noteEnergetique emissionGazEffetDeSerre = noteEnergetique.valueOf(VuesUtils.getInputValue(this.vue.mainPanel, "emissionGazEffetDeSerre"));

			String referenceLogement = VuesUtils.getInputValue(this.vue.mainPanel, "referenceLogement");

			Boolean meuble = Boolean.parseBoolean(VuesUtils.getInputValue(this.vue.mainPanel, "meuble"));

			String equipementAccesTechnologie = VuesUtils.getInputValue(this.vue.mainPanel, "equipementAccesTechnologie");

			Logement logement = new Logement(
				adresse,
				refCadastrale,
				bati,
				montantDepotGarantie,
				numeroFiscal,
				taxeFonciere,
				loyer,
				charges,
				typePorte,
				datePermisConstruire,
				dateConstruction,
				constatAmiante,
				constatPlomb,
				constatElectricite,
				constatEnergetique,
				emissionGazEffetDeSerre,
				referenceLogement,
				meuble,
				equipementAccesTechnologie
			);


			System.out.println(logement);
		}
	}
}
