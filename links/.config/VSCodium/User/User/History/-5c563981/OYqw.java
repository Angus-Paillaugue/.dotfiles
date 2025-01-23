package vues;

import java.awt.*;
import javax.swing.*;

public class MesDocuments extends JFrame {
  private static final long serialVersionUID = 1L;

  public static void main(String[] args) {
    AppTheme.setup();
    EventQueue.invokeLater(
        () -> {
          try {
            MesDocuments frame = new MesDocuments();
            frame.setVisible(true);
          } catch (Exception e) {
            e.printStackTrace();
          }
        });
  }

  public MesDocuments() {
    setTitle("Mes documents");
    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    setSize(850, 600);
  }
}
