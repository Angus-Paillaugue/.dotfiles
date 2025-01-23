package controleurs;

import java.awt.Component;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JPanel;

import dao.ColocationDAO;
import dao.PersonneDAO;
import modele.Personne;
import utils.VuesUtils;
import vues.DetailAppartement;
import vues.MesAppartements;
import vues.SupprimerLocataire;
import vues.composants.ModalSuccess;

public class ControleurSupprimerLocataire implements ActionListener {

  private SupprimerLocataire vue;

  public ControleurSupprimerLocataire(SupprimerLocataire vue) {
    this.vue = vue;
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    JButton target = (JButton) e.getSource();
    if (target.getName().equals("suppButton")) {
      int noLocataireSelected = 0;

      // Récupérer le panneau contenant les cases à cocher
      for (Component component : this.vue.locatairePanel.getComponents()) {
        if (component instanceof JPanel) {
          // Parcourir les sous-panneaux
          JPanel subPanel = (JPanel) component;
          for (Component subComponent : subPanel.getComponents()) {
            if (subComponent instanceof JCheckBox) {
              JCheckBox checkBox = (JCheckBox) subComponent;
              if (checkBox.isSelected()) {
                // Récupérer le nom de la case à cocher
                int idLocataire = VuesUtils.toInt(checkBox.getName());
                this.vue.logement.getColocation().delColocByID(idLocataire);
                ColocationDAO colocationDAO = new ColocationDAO();
                PersonneDAO personneDAO = new PersonneDAO();
                Personne locataire = personneDAO.find(idLocataire);
                colocationDAO.delColoc(this.vue.logement.getColocation(), locataire);
                noLocataireSelected ++;
              }
            }
          }
        }
      }

      this.vue.dispose();
      new DetailAppartement(this.vue.logement).setVisible(true);
      new ModalSuccess("Succès", "Locataire" + (noLocataireSelected > 1 ? "s" : "") + " supprimé" + (noLocataireSelected > 1
          ? "s"
          : ""), true);

    } else if (target.getName().equals("cancelButton")) {
      vue.dispose();
      new MesAppartements().setVisible(true);
    }
  }
}
