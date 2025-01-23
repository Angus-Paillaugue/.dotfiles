package controleurs;

import java.awt.Component;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JPanel;

import dao.ColocationDAO;
import dao.LocationDAO;
import modele.Colocation;
import modele.Personne;
import utils.VuesUtils;
import vues.MesAppartements;
import vues.SupprimerLocataire;

public class ControleurSupprimerLocataire implements ActionListener {

  private SupprimerLocataire vue;

  public ControleurSupprimerLocataire(SupprimerLocataire vue) {
    this.vue = vue;
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    JButton target = (JButton) e.getSource();
    if (target.getName().equals("suppButton")) {

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
                System.out.println("Locataire à supprimer : " + idLocataire);
                if (this.vue.logement.isLocation()) {
                  LocationDAO locationDAO = new LocationDAO();
                  locationDAO.delete(idLocataire);
                  this.vue.logement.setLocation(null);
                } else {
                  Colocation colocation = this.vue.logement.getColocation();
                  Personne personne = colocation.getColocataires().stream().filter(p -> p.getIdLocataire() == idLocataire)
                      .findFirst().get();
                  ColocationDAO colocationDAO = new ColocationDAO();
                  colocationDAO.delColoc(colocation, personne);
                  this.vue.logement.getColocation().delColocByID(idLocataire);
                }
                // ICI RAJOUTER LA LOGIQUE POUR SUPPRIMER UN LOCATAIRE
              }
            }
          }
        }
      }

    } else if (target.getName().equals("cancelButton")) {
      vue.dispose();
      new MesAppartements().setVisible(true);
    }
  }
}
