package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;

import dao.AdresseDAO;
import dao.PersonneDAO;
import vues.composants.ModalDanger;
import vues.composants.ModalSuccess;
import modele.Adresse;
import modele.Personne;
import modele.SituationFamiliale;
import modele.TypeDeContratDeTravail;
import utils.VuesUtils;
import vues.AjouterGarant;
import vues.MesAppartements;

public class ControleurAjouterGarant implements ActionListener {

  private AjouterGarant vue;

  public ControleurAjouterGarant(AjouterGarant vue) {
    this.vue = vue;
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    JButton target = (JButton) e.getSource();
    if (target.getName().equals("saveButton")) {

      try {
        Adresse adr =
            new Adresse(
                VuesUtils.getInputValue(vue.panel, "numero"),
                VuesUtils.getInputValue(vue.panel, "rue"),
                VuesUtils.getInputValue(vue.panel, "complement"),
                VuesUtils.getInputValue(vue.panel, "cp"),
                VuesUtils.getInputValue(vue.panel, "ville"));
        Personne garant =
            new Personne(
                VuesUtils.getInputValue(vue.panel, "nom"),
                VuesUtils.getInputValue(vue.panel, "prenom"),
                VuesUtils.toInt(VuesUtils.getInputValue(vue.panel, "id")),
                VuesUtils.toLocalDate(VuesUtils.getInputValue(vue.panel, "dateNaissance")),
                VuesUtils.getInputValue(vue.panel, "lieuNaissance"),
                SituationFamiliale.fromDescription(
                    VuesUtils.getInputValue(vue.panel, "situationFamille")),
                VuesUtils.getInputValue(vue.panel, "profession"),
                VuesUtils.getInputValue(vue.panel, "employeur"),
                TypeDeContratDeTravail.valueOf(
                    VuesUtils.getInputValue(vue.panel, "contratDeTravail")),
                VuesUtils.toFloat(VuesUtils.getInputValue(vue.panel, "remNet")),
                VuesUtils.toFloat(VuesUtils.getInputValue(vue.panel, "autreRemuneration")),
                VuesUtils.getInputValue(vue.panel, "email"),
                VuesUtils.getInputValue(vue.panel, "telephone"),
                adr);
        PersonneDAO personneDAO = new PersonneDAO();
        AdresseDAO adresseDAO = new AdresseDAO();
        adr = adresseDAO.create(adr);
        personneDAO.create(garant, adr.getId());

        new MesAppartements().setVisible(true);
        new ModalSuccess("Succès", "Garant ajouté avec succès", true).setVisible(true);
        this.vue.dispose();

      } catch (Exception ex) {
        System.out.println(ex);
        new ModalDanger("Erreur", ex.getMessage(), true).setVisible(true);
      }

    } else if (target.getName().equals("cancelButton")) {
      vue.dispose();
      new MesAppartements().setVisible(true);
    }
  }
}
