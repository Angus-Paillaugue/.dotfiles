package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.time.LocalDate;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.swing.JComponent;

import dao.ProprietaireDAO;
import jdbc.SharedState;
import modele.Adresse;
import modele.Batiment;
import modele.Charges;
import modele.Loyer;
import modele.ModeDePaiment;
import modele.Proprietaire;
import modele.noteEnergetique;
import modele.Logement;
import vues.AjouterLogement;
import vues.MesAppartements;
import vues.composants.ModalDanger;
import vues.composants.ModalSuccess;
import utils.VuesUtils;
import utils.Logger;

public class AjouterLogementControleur implements ActionListener {
  private AjouterLogement vue;

  public AjouterLogementControleur(AjouterLogement vue) {
    this.vue = vue;
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    JComponent target = (JComponent) e.getSource();
    Proprietaire proprietaire = SharedState.getInstance().getProprietaire();

    if (target.getName() != null && target.getName().equals("cancel")) {
      this.vue.dispose();
      new MesAppartements().setVisible(true);
    } else {
      // Submit button clicked, create new location

      try {
        Batiment batiment = proprietaire
            .getBatiment()
            .get(VuesUtils.getInputValueIndex(this.vue.mainPanel, "batiment"));

        Adresse adresse = batiment.getAdresse();
        adresse.setComplement(VuesUtils.getInputValue(this.vue.mainPanel, "complementAdresse"));

        String refCadastrale = VuesUtils.getInputValue(this.vue.mainPanel, "refCadastrale");

        Float surfaceHabitable = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "surfaceHabitable"));

        Float surfaceTotale = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "surfaceTotale"));

        Boolean bati = VuesUtils.getInputValue(this.vue.mainPanel, "bati-Oui") == null ? false : true;

        String numeroFiscal = VuesUtils.getInputValue(this.vue.mainPanel, "numeroFiscal");

        float taxeFonciere = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "taxeFonciere"));

        Loyer loyer =
            new Loyer(
                VuesUtils.toFloat(
                    VuesUtils.getInputValue(this.vue.mainPanel, "montantHorsCharges")),
                VuesUtils.toInt(VuesUtils.getInputValue(this.vue.mainPanel, "jourVersement")),
                LocalDate.now(),
                VuesUtils.toLocalDate(
                    VuesUtils.getInputValue(this.vue.mainPanel, "dateProchaineRevision")),
                ModeDePaiment.valueOf(
                    VuesUtils.getInputValue(this.vue.mainPanel, "modeDePayment")));

        Charges charges =
            new Charges(
                VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "orduresMenageres")),
                VuesUtils.toFloat(
                    VuesUtils.getInputValue(this.vue.mainPanel, "entretienPartiesCommunes")),
                VuesUtils.toFloat(
                    VuesUtils.getInputValue(this.vue.mainPanel, "eclairageCommun")),
                VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "eauPartieFixe")),
                VuesUtils.toFloat(
                    VuesUtils.getInputValue(this.vue.mainPanel, "provisionSurCharge")),
                VuesUtils.toInt(VuesUtils.getInputValue(this.vue.mainPanel, "indexEau")),
                VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "prixEauMetreCube")),
                LocalDate.now());

        LocalDate datePermisConstruire =
            VuesUtils.toLocalDate(
                VuesUtils.getInputValue(this.vue.mainPanel, "dateProchaineRevision"));

        LocalDate dateConstruction = VuesUtils.toLocalDate(
            VuesUtils.getInputValue(this.vue.mainPanel, "dateConstructionBatiment"));

        String constatAmiante = this.vue.getFile("constatAmiante");

        String constatPlomb = this.vue.getFile("constatPlomb");

        String constatElectricite = this.vue.getFile("constatElectricite");

        String typeLogement = VuesUtils.getInputValue(this.vue.mainPanel, "typeLogement");

        noteEnergetique constatEnergetique = noteEnergetique
            .valueOf(VuesUtils.getInputValue(this.vue.mainPanel, "noteEnergetique"));

        noteEnergetique emissionGazEffetDeSerre = noteEnergetique.valueOf(
            VuesUtils.getInputValue(this.vue.mainPanel, "emissionGazEffetDeSerre"));

        String referenceLogement = VuesUtils.getInputValue(this.vue.mainPanel, "referenceLogement");

        Boolean meuble = VuesUtils.getInputValue(this.vue.mainPanel, "meuble") == null ? true : false;

        String equipementAccesTechnologie = VuesUtils.getInputValue(this.vue.mainPanel, "accesTechnologique");

        int nbPieces = VuesUtils.toInt(VuesUtils.getInputValue(this.vue.mainPanel, "nbPieces"));

        Logement logement = new Logement(
            adresse,
            surfaceHabitable,
            surfaceTotale,
            refCadastrale,
            bati,
            numeroFiscal,
            taxeFonciere,
            loyer,
            charges,
            datePermisConstruire,
            dateConstruction,
            constatAmiante,
            constatPlomb,
            constatElectricite,
            constatEnergetique,
            emissionGazEffetDeSerre,
            referenceLogement,
            meuble,
            equipementAccesTechnologie);

        logement.setNbPieces(nbPieces);

        if (typeLogement == "Colocation") {
          logement.setIsCoLocation();
        } else {
          logement.setIsLocation();
        }

        ProprietaireDAO proprietaireDAO = new ProprietaireDAO();
        proprietaire = proprietaireDAO.addLogement(proprietaire, logement, batiment);
        Logger.log(proprietaire.get);
        SharedState.getInstance().setProprietaire(proprietaire);
        this.vue.dispose();
        new MesAppartements().setVisible(true);
        new ModalSuccess("Success", "Le bâtiment a été ajouté avec success!", true)
            .setVisible(true);
      } catch (Exception ex) {
        System.out.println(ex);
        new ModalDanger("Erreur", "Erreur lors de la création du logement", true).setVisible(true);
        Logger.error(ex);
      }
    }
  }
}
