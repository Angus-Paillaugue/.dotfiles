package ihm;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.GridBagLayout;
import java.awt.GridBagConstraints;

public class TextField {
  private JPanel panel;
  public TextField(String label, String value, String iconName) {
    this.panel = new JPanel(new GridBagLayout());
    this.panel.setBackground(null);
    GridBagConstraints gbc = new GridBagConstraints();
    gbc.fill = GridBagConstraints.HORIZONTAL;
    gbc.weightx = 1.0;
    gbc.gridx = 0;
    gbc.gridy = 0;
    gbc.gridwidth = 1;
    JLabel customLabel = new JLabel(label);
    this.panel.add(customLabel, gbc);
    JTextField field = new JTextField();
    if(value != null) {
      field.setText(value);
    }

    gbc.gridx = 1;
    gbc.gridwidth = 2;
    JLabel icon = new JLabel(new ImageIcon(Constants.ICONS_PATH + iconName));
    icon.setBorder(new EmptyBorder(0, 5, 0, 0));
    this.panel.add(field);
    this.panel.add(icon);
  }

  public JPanel build() {
    return this.panel;
  }
}
