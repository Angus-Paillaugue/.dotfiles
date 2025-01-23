package ihm;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.BorderLayout;

public class TextField {
  private JPanel panel;

  public TextField(String label, String value, String iconName) {
    this.panel = new JPanel(new BorderLayout());
    this.panel.setBackground(null);
    JLabel label = new JLabel(label);
    JTextField field = new JTextField();
    if(value != null) {
      field.setText(value);
    }

    JLabel icon = new JLabel(new ImageIcon(Constants.ICONS_PATH + iconName));
    icon.setBorder(new EmptyBorder(0, 5, 0, 0));
    this.panel.add(field, BorderLayout.CENTER);
    this.panel.add(icon, BorderLayout.EAST);
  }

  public JPanel build() {
    return this.panel;
  }
}
