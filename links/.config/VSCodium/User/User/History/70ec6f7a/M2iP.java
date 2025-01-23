package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import javax.swing.JComponent;
import javax.swing.JRadioButton;
import javax.swing.JScrollPane;

import jdbc.SharedState;
import modele.BienLouable;
import vues.GenererSoldeDeToutCompte;
import vues.MesDocuments;
import vues.mesDocuments.SoldeDeToutCompte;

public class GenererSoldeDeToutCompteControleur implements ActionListener {

  private GenererSoldeDeToutCompte vue;

  public GenererSoldeDeToutCompteControleur(GenererSoldeDeToutCompte vue) {
    this.vue = vue;
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    JComponent target = (JComponent) e.getSource();

    if (target.getName() != null && target.getName().equals("cancelButton")) {
      // Cancel button clicked
      new MesDocuments().setVisible(true);
      this.vue.dispose();
    } else if (target.getName() != null && target.getName().equals("genererButton")) {
      // Generate button clicked
      for (int i = 0; i < this.vue.radioPanel.getComponentCount(); i++) {
        JRadioButton radio = (JRadioButton) this.vue.radioPanel.getComponent(i);
        if (radio.isSelected()) {
          Integer idBien = Integer.parseInt(radio.getName());
          List<BienLouable> biens =
              new LinkedList<>(
                  SharedState.getInstance().getProprietaire().getBatiment().stream()
                      .flatMap(bat -> bat.getBiensLouables().stream())
                      .collect(Collectors.toList()));
          new SoldeDeToutCompte(biens.get(idBien)).setVisible(true);
        }
      }
    } else if (target instanceof JScrollPane) {
      // Bouton du JScrollPane selectionné

    } else {
      // Radio button selected

      // IMPLEMENTER CE QU'IL SE PASSE LORSQUE L'ON CLIQUE SUR UN RADIO BOUTON (METTRE A JOUR LE
      // SCROLLPANE)

    }
  }
}
