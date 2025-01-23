package ihm;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.BorderLayout;

public class MoneyTextField {
  private JPanel panel;

  public MoneyTextField(String label) {
    this.panel = new JPanel(new BorderLayout());
    this.panel.setBackground(null);

    JLabel customLabel = new JLabel(label);
    this.panel.add(customLabel, BorderLayout.WEST);
    JFormattedTextField field = new JFormattedTextField();
    this.panel.add(field, BorderLayout.CENTER);

    JLabel icon = new JLabel(new ImageIcon(Constants.ICONS_PATH + "euro-16x16-body.png"));
    icon.setBorder(new EmptyBorder(0, 5, 0, 0));
    this.panel.add(icon, BorderLayout.EAST);
  }

  public JPanel build() {
    return this.panel;
  }
}
