package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;

import dao.AdresseDAO;
import dao.GarantDAO;
import dao.PersonneDAO;
import vues.composants.ModalDanger;
import vues.composants.ModalSuccess;
import modele.Adresse;
import modele.Location;
import modele.Personne;
import modele.SituationFamiliale;
import modele.TypeDeContratDeTravail;
import utils.VuesUtils;
import vues.AjouterGarant;
import vues.ProfilLocataire;

public class ControleurAjouterGarant implements ActionListener {

  private AjouterGarant vue;
  private Boolean isColocation;

  public ControleurAjouterGarant(AjouterGarant vue, Boolean isColocation) {
    this.vue = vue;
    
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    JButton target = (JButton) e.getSource();
    if (target.getName().equals("saveButton")) {
    	Location l = this.vue.location;

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
        AdresseDAO adresseDAO = new AdresseDAO();
        adr = adresseDAO.create(adr);
        PersonneDAO personneDAO = new PersonneDAO();
        personneDAO.create(garant, adr.getId());
        GarantDAO garantDAO = new GarantDAO();
        garantDAO.ajouterGarant(garant, l);

        new ProfilLocataire(this.vue.locataire, this.vue.location, false).setVisible(true);
        new ModalSuccess("Succès", "Garant ajouté avec succès", true).setVisible(true);
        this.vue.dispose();

      } catch (Exception ex) {
        System.out.println(ex);
        new ModalDanger("Erreur", ex.getMessage(), true).setVisible(true);
      }

    } else if (target.getName().equals("cancelButton")) {
      vue.dispose();
      new ProfilLocataire(this.vue.locataire, this.vue.location, false).setVisible(true);
    }
  }
}
