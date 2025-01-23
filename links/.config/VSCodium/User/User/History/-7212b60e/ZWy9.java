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
    JLabel customLabel = new JLabel(label);
    JTextField field = new JTextField();
    if(value != null) {
      field.setText(value);
    }

    JLabel icon = new JLabel(new ImageIcon(Constants.ICONS_PATH + iconName));
    icon.setBorder(new EmptyBorder(0, 5, 0, 0));
    this.panel.add(customLabel, gbc);
    this.panel.add(field);
    this.panel.add(icon);

    formGbc.gridx = 0;
    formGbc.gridy = 0;
    formGbc.gridwidth = 1;
    formPanel.add(new JLabel("Adresse"), formGbc);

    JTextField addressField = new JTextField();
    formGbc.gridx = 1;
    formGbc.gridwidth = 2;
    formPanel.add(addressField, formGbc);
  }

  public JPanel build() {
    return this.panel;
  }
}
