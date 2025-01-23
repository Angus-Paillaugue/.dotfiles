package ihm;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.text.NumberFormatter;
import java.awt.BorderLayout;
import java.text.NumberFormat;

public class MoneyTextField {
  private JPanel panel;

  public MoneyTextField(String label, Number value) {
    if (value == null) {
      value = 0;
    }
    this.panel = new JPanel(new BorderLayout());
    this.panel.setBackground(null);

    JLabel customLabel = new JLabel(label);
    this.panel.add(customLabel, BorderLayout.WEST);
    NumberFormat format = NumberFormat.getInstance(Constants.LOCALE);
    format.setMaximumFractionDigits(0);
    NumberFormatter formatter = new NumberFormatter(format);
    formatter.setMinimum(0.0);
    formatter.setMaximum(10000000.0);
    formatter.setAllowsInvalid(false);
    formatter.setOverwriteMode(true);
    JFormattedTextField field = new JFormattedTextField(formatter);
    field.setValue(value);

    this.panel.add(field, BorderLayout.CENTER);
    JLabel icon = new JLabel(new ImageIcon(Constants.ICONS_PATH + "euro-16x16-body.png"));
    icon.setBorder(new EmptyBorder(0, 5, 0, 0));
    this.panel.add(icon, BorderLayout.EAST);
  }

  public JPanel build() {
    return this.panel;
  }
}
