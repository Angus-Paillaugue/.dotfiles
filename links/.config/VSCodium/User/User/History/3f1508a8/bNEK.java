package controleurs;

import java.util.List;
import java.util.Properties;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.stream.Collectors;

import vues.Constants;
import vues.GenererContractDeLocation;
import vues.MesDocuments;
import vues.mesDocuments.ContractDeLocation;

import javax.swing.JComponent;
import javax.swing.JRadioButton;

import jdbc.SharedState;
import modele.BienLouable;
import modele.Proprietaire;

public class GenererContractDeLocationControleur implements ActionListener {
  private GenererContractDeLocation vue;

  public GenererContractDeLocationControleur(GenererContractDeLocation vue) {
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
      for (int i = 0; i < this.vue.radioPanelLocation.getComponentCount(); i++) {
        JRadioButton radio = (JRadioButton) this.vue.radioPanelLocation.getComponent(i);
        if (radio.isSelected()) {
          Integer idBien = Integer.parseInt(radio.getName());
          List<BienLouable> biens =
              new ArrayList<>(
                  proprietaire.getBatiment().stream()
                      .flatMap(bat -> bat.getBiensLouables().stream())
                      .collect(Collectors.toList()));
          new ContractDeLocation(biens.get(idBien)).setVisible(true);
        }
      }
      for (int i = 0; i < this.vue.radioPanelColocation.getComponentCount(); i++) {
        JRadioButton radio = (JRadioButton) this.vue.radioPanelColocation.getComponent(i);
        if (radio.isSelected()) {
          Integer idBien = Integer.parseInt(radio.getName());
          List<BienLouable> biens =
              new ArrayList<>(
                  proprietaire.getBatiment().stream()
                      .flatMap(bat -> bat.getBiensLouables().stream())
                      .collect(Collectors.toList()));
          new ContractDeLocation(biens.get(idBien)).setVisible(true);
        }
      }
    } else {
      // Radio button selected
      this.vue.genererButton.setEnabled(true);
    }
  }
}
