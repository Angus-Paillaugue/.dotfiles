package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.time.LocalDate;
import java.util.LinkedList;

import javax.swing.JButton;

import dao.AdresseDAO;
import dao.ColocationDAO;
import dao.LocationDAO;
import dao.PersonneDAO;
import vues.composants.ModalDanger;
import vues.composants.ModalSuccess;
import modele.Adresse;
import modele.Colocation;
import modele.Location;
import modele.Logement;
import modele.Personne;
import modele.SituationFamiliale;
import modele.TypeDeContratDeTravail;
import utils.Logger;
import utils.VuesUtils;
import vues.AjouterLocataire;
import vues.MesAppartements;

public class ControleurAjouterLocataire implements ActionListener {

  private AjouterLocataire vue;

  public ControleurAjouterLocataire(AjouterLocataire vue) {
    this.vue = vue;
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    JButton target = (JButton) e.getSource();
    if (target.getName().equals("saveButton")) {
      Logement b = this.vue.logement;

      try {
        Adresse adr =
            new Adresse(
                VuesUtils.getInputValue(vue.panel, "numero"),
                VuesUtils.getInputValue(vue.panel, "rue"),
                VuesUtils.getInputValue(vue.panel, "complement"),
                VuesUtils.getInputValue(vue.panel, "cp"),
                VuesUtils.getInputValue(vue.panel, "ville"));
        Personne locataire =
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
        personneDAO.create(locataire, adr.getId());

        if (b.isLocation()) {
          if (b.getLocation() != null && b.getLocation().getLocataires().size() == 1) {
            if (b.getLocation().getLocataires().get(0).getSituationFamiliale()
                    == SituationFamiliale.MARIE
                && locataire.getSituationFamiliale() == SituationFamiliale.MARIE) {
              // Ajout du locataire
              b.getLocation().addLocataire(locataire);
              LocationDAO locationDAO = new LocationDAO();
              locationDAO.ajouterLocataire(b.getLocation(), locataire);
              new MesAppartements().setVisible(true);
              new ModalSuccess("Succès", "Locataire ajouté avec succès", true).setVisible(true);
            } else {
              new MesAppartements().setVisible(true);
              new ModalDanger(
                      "Erreur",
                      "Le logement est déja occupé par une personne meriée, vous pouvez uniquement ajouter une personne mariée",
                      true)
                  .setVisible(true);
            }
          } else {
            b.addLocation(
                new Location(
                    locataire,
                    new LinkedList<>(),
                    LocalDate.now(),
                    b.getAdresse(),
                    VuesUtils.toFloat(VuesUtils.getInputValue(vue.panel, "caution"))));
            LocationDAO locationDAO = new LocationDAO();
            locationDAO.create(b.getLocation(), b);
            new MesAppartements().setVisible(true);
            new ModalSuccess("Succès", "Locataire ajouté avec succès", true).setVisible(true);
            this.vue.dispose();
          }
        } else if (b.isColocation()) {
          // Colocation

          if (b.getColocation() != null && b.getColocation().getColocataires().size() == 0) {
            // Si il n'y a pas encore de colocataire
            b.addColocation(new Colocation());
          }
          b.getColocation()
              .addColoc(
                  locataire,
                  null,
                  LocalDate.now(),
                  adr,
                  VuesUtils.toFloat(VuesUtils.getInputValue(vue.panel, "caution")));
          ColocationDAO colocationDAO = new ColocationDAO();
          colocationDAO.create(b.getColocation(), b);
          new MesAppartements().setVisible(true);
          new ModalSuccess("Succès", "Colocataire ajouté avec succès", true).setVisible(true);
          this.vue.dispose();
        }
        this.vue.dispose();
      } catch (Exception ex) {
        System.out.println(ex.printStackTrace());
        new ModalDanger("Erreur", ex.getMessage(), true).setVisible(true);
      }

    } else if (target.getName().equals("cancelButton")) {
      vue.dispose();
      new MesAppartements().setVisible(true);
    }
  }
}
