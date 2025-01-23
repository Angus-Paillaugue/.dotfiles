package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.time.LocalDate;

import javax.swing.JComponent;

import modele.Adresse;
import modele.Charges;
import modele.Loyer;
import modele.ModeDePaiment;
import modele.Garage;
import vues.AjouterGarage;
import vues.Constants;
import vues.MesAppartements;
import utils.VuesUtils;
import utils.Logger;

public class AjouterGarageControleur implements ActionListener {
  private AjouterGarage vue;

  public AjouterGarageControleur(AjouterGarage vue) {
    this.vue = vue;
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    JComponent target = (JComponent) e.getSource();

    if (target.getName() != null && target.getName().equals("cancel")) {
      this.vue.dispose();
      new MesAppartements(Constants.proprietaire).setVisible(true);
    } else {
      // Submit button clicked, create new location

      try {

        Adresse adresse =
            new Adresse(
                VuesUtils.getInputValue(this.vue.mainPanel, "adresseNumero"),
                VuesUtils.getInputValue(this.vue.mainPanel, "adresseRue"),
                VuesUtils.getInputValue(this.vue.mainPanel, "adresseVille"),
                VuesUtils.getInputValue(this.vue.mainPanel, "adresseCP"));

        String refCadastrale = VuesUtils.getInputValue(this.vue.mainPanel, "refCadastrale");

        Boolean bati = Boolean.parseBoolean(VuesUtils.getInputValue(this.vue.mainPanel, "bati"));

        float montantDepotGarantie =
            Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "montantDepotGarantie"));

        String numeroFiscal = VuesUtils.getInputValue(this.vue.mainPanel, "numeroFiscal");

        float taxeFonciere =
            Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "taxeFonciere"));

        Loyer loyer =
            new Loyer(
                Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "montantHorsCharge")),
                Integer.parseInt(VuesUtils.getInputValue(this.vue.mainPanel, "jourVersement")),
                LocalDate.now(),
                LocalDate.parse(
                    VuesUtils.getInputValue(this.vue.mainPanel, "dateProchaineRevision")),
                ModeDePaiment.valueOf(
                    VuesUtils.getInputValue(this.vue.mainPanel, "modeDePayment")));

        Charges charges =
            new Charges(
                Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "nouvelIndexEau")),
                Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "orduresMenageres")),
                Float.parseFloat(
                    VuesUtils.getInputValue(this.vue.mainPanel, "entretienPartiesCommunes")),
                Float.parseFloat(
                    VuesUtils.getInputValue(this.vue.mainPanel, "eclairagePartiesCommunes")),
                Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "eauPartieFixe")),
                Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "prixEau")),
                Float.parseFloat(VuesUtils.getInputValue(this.vue.mainPanel, "ancienIndexEau")),
                Float.parseFloat(
                    VuesUtils.getInputValue(this.vue.mainPanel, "provisionSurCharge")));

        Garage garage =
            new Garage(
                adresse,
                refCadastrale,
                bati,
                montantDepotGarantie,
                numeroFiscal,
                taxeFonciere,
                loyer,
                charges);
        System.out.println(garage);
      } catch (Exception ex) {
        Logger.error(ex);
      }
    }
  }
}
