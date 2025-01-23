package composants;

import java.awt.BorderLayout;
import java.text.NumberFormat;
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.text.NumberFormatter;

import vues.Constants;

public class MoneyTextField {
  private JPanel panel;

  /**
   * Constructs a MoneyTextField component with a label, a formatted text field for numeric input,
   * and an icon.
   *
   * @param label the text to be displayed as the label of the text field
   * @param value the initial numeric value to be set in the text field
   */
  public MoneyTextField(String label, Number value, String name) {
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
		field.setName(name);
		field.get
    this.panel.add(field, BorderLayout.CENTER);

    JLabel icon = new JLabel(new ImageIcon(Constants.ICONS_PATH + "euro-16x16-body.png"));
    icon.setBorder(new EmptyBorder(0, 5, 0, 0));
    this.panel.add(icon, BorderLayout.EAST);
  }

  public JPanel build() {
    return this.panel;
  }
}
