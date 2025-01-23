package vues;

import java.awt.*;
import javax.swing.*;

public class MesDocuments extends JFrame {
  private static final long serialVersionUID = 1L;

  private JPanel contentPane;

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
    setLocationRelativeTo(null);

    contentPane = new JPanel(new BorderLayout());
    setContentPane(contentPane);

    JPanel panel = new JPanel();
    panel.setLayout(new GridBagLayout()); // Use GridBagLayout for flexible positioning
    GridBagConstraints gbc = new GridBagConstraints();
    gbc.insets = new Insets(10, 10, 10, 10); // Add padding between components
    gbc.fill = GridBagConstraints.HORIZONTAL;

    JLabel label = new JLabel("Mes documents");
    label.setFont(Constants.WINDOW_TITLE_FONT);
    label.setForeground(Constants.HEADING_COLOR);

    contentPane.add(label, BorderLayout.NORTH);
  }
}
