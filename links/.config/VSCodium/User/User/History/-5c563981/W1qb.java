package vues;

import java.awt.*;
import javax.swing.*;
import modele.Proprietaire;

public class MesDocuments extends JFrame {
  private static final long serialVersionUID = 1L;

  public static void main(String[] args) {
    AppTheme.setup();
    EventQueue.invokeLater(
        () -> {
          try {
            MesDocuments frame = new MesDocuments(Constants.proprietaire);
            frame.setVisible(true);
          } catch (Exception e) {
            e.printStackTrace();
          }
        });
  }

  public MesDocuments(Proprietaire proprietaire) {
    setTitle("Mes documents");
    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    setSize(850, 600);
  }
}
