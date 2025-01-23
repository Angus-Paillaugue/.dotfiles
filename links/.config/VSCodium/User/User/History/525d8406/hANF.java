package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;

import dao.LogementDAO;
import modele.noteEnergetique;
import utils.VuesUtils;
import vues.DetailAppartement;
import vues.ModifierLogement;

public class ModifierLogementControleur implements ActionListener {

  private ModifierLogement vue;

  public ModifierLogementControleur(ModifierLogement vue) {
    this.vue = vue;
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    JButton target = (JButton) e.getSource();
    if (target.getName().equals("cancelBtn")) {
      this.vue.dispose();
      new DetailAppartement(this.vue.logement).setVisible(true);
    } else if (target.getName().equals("saveBtn")) {
      if (!VuesUtils.getInputValue(this.vue.mainPanel, "complementAdresse").equals("")) {
        this.vue
            .logement
            .getAdresse()
            .setComplement(VuesUtils.getInputValue(this.vue.mainPanel, "complementAdresse"));
      }

      if (!VuesUtils.getInputValue(this.vue.mainPanel, "surfaceHabitable").equals("")) {
        this.vue.logement.setSurfaceHabitable(
            VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "surfaceHabitable")));
      }

      if (!VuesUtils.getInputValue(this.vue.mainPanel, "surfaceTotale").equals("")) {
        this.vue.logement.setSurfaceTotale(
            VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "surfaceTotale")));
      }

      this.vue.logement.setConstatEnergetique(
          noteEnergetique.fromDescription(
              VuesUtils.getInputValue(this.vue.mainPanel, "noteEnergetique")));

      this.vue.logement.setEmissionGazEffetDeSerre(
          noteEnergetique.fromDescription(
              VuesUtils.getInputValue(this.vue.mainPanel, "emissionGazEffetDeSerre")));

      Boolean meuble = VuesUtils.getInputValue(this.vue.mainPanel, "Meublé") == null ? true : false;
      this.vue.logement.setMeuble(meuble);
      this.vue.logement.setTaxeFonciere(
          VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "taxeFonciere")));

      String constatAmiante = this.vue.getFile("constatAmiante");
      this.vue.logement.setConstatAmiante(constatAmiante);

      String constatPlomb = this.vue.getFile("constatPlomb");
      this.vue.logement.setConstatPlomb(constatPlomb);

      String constatElectricite = this.vue.getFile("constatElectricite");
      this.vue.logement.setConstatElectricite(constatElectricite);

      LogementDAO l = new LogementDAO();
      l.update(this.vue.logement);

      this.vue.dispose();
      new DetailAppartement(this.vue.logement).setVisible(true);
    }
  }
}
