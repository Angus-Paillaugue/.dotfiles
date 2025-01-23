package ihm;

package ihm;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.BorderLayout;
import java.awt.GridLayout;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.ImageIcon;

public class MoneyTextField {
  private JPanel panel;

  public TextField(String label) {
    this.panel = new JPanel(new BorderLayout());
    this.panel.setBackground(null);

    if (label != null) {
      JLabel customLabel = new JLabel(label);
      this.panel.add(customLabel, BorderLayout.WEST);
    }
    FormattedTextField field = new FormattedTextField();
    this.panel.add(field, BorderLayout.CENTER);

      JLabel icon = new JLabel(new ImageIcon(Constants.ICONS_PATH + "euro-16x16-body.png"));
      icon.setBorder(new EmptyBorder(0, 5, 0, 0));
      this.panel.add(icon, BorderLayout.EAST);
  }

  public JPanel build() {
    return this.panel;
  }
}
