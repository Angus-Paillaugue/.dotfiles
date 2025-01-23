package controleurs;

import java.util.List;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.stream.Collectors;
import vues.GenererQuittanceDeLoyer;
import vues.MesDocuments;
import vues.mesDocuments.QuittanceDeLoyer;

import javax.swing.JComponent;
import javax.swing.JRadioButton;

import jdbc.SharedState;
import modele.Logement;
import modele.Proprietaire;
import utils.VuesUtils;

public class GenererQuittanceDeLoyerControleur implements ActionListener {

  private GenererQuittanceDeLoyer vue;

  public GenererQuittanceDeLoyerControleur(GenererQuittanceDeLoyer vue) {
    this.vue = vue;
  }

  public void actionPerformed(ActionEvent e) {
    JComponent target = (JComponent) e.getSource();
    Proprietaire proprietaire = SharedState.getInstance().getProprietaire();

    if (target.getName() != null && target.getName().equals("cancelButton")) {
      // Cancel button clicked
      new MesDocuments().setVisible(true);
      this.vue.dispose();
    } else if (target.getName() != null && target.getName().equals("genererButton")) {
      // Generate button clicked
      List<Logement> logements =
        proprietaire.getBatiment().stream()
          .flatMap(b -> b.getBiensLouables().stream())
          .filter(l -> l instanceof Logement)
          .map(l -> (Logement) l)
          .collect(Collectors.toList());
      for (int i = 0; i < this.vue.radioPanelLocation.getComponentCount(); i++) {
        JRadioButton radio = (JRadioButton) this.vue.radioPanelLocation.getComponent(i);
        if (radio.isSelected()) {
          Integer idBien = Integer.parseInt(radio.getName());
          new QuittanceDeLoyer(
                  logements.get(idBien), VuesUtils.getInputValue(this.vue.panel, "dateQuittance"))
              .setVisible(true);
        }
      }
      for (int i = 0; i < this.vue.radioPanelColocation.getComponentCount(); i++) {
        JRadioButton radio = (JRadioButton) this.vue.radioPanelColocation.getComponent(i);
        if (radio.isSelected()) {
          Integer idBien = Integer.parseInt(radio.getName());
          new QuittanceDeLoyer(
                  logements.get(idBien), VuesUtils.getInputValue(this.vue.panel, "dateQuittance"))
              .setVisible(true);
        }
      }
    } else {
      // Radio button selected
      this.vue.genererButton.setEnabled(true);
    }
  }
}
