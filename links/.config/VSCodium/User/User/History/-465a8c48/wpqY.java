package utils;

import java.awt.Component;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;

import javax.swing.JComboBox;
import javax.swing.JFileChooser;
import javax.swing.JFormattedTextField;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.JTextField;

public class VuesUtils {
  public static String getInputValue(JPanel pane, String name) {
    return getInputValueFromComponents(pane.getComponents(), name);
  }

  public static Integer getInputValueIndex(JPanel pane, String name) {
    return getInputValueIndex(pane.getComponents(), name);
  }

  private static Integer getInputValueIndex(Component[] components, String name) {
    for (Component component : components) {
      if (component instanceof JComboBox && name.equals(component.getName())) {
        return ((JComboBox<?>) component).getSelectedIndex();
      } else if (component instanceof JPanel) {
        Integer value = getInputValueIndex(((JPanel) component).getComponents(), name);
        if (value != null) {
          return value;
        }
      }
    }
    return null;
  }

  private static String getInputValueFromComponents(Component[] components, String name) {
    for (Component component : components) {
      if (component instanceof JTextField && name.equals(component.getName())) {
        return ((JTextField) component).getText();
      } else if (component instanceof JFormattedTextField && name.equals(component.getName())) {
        return ((JFormattedTextField) component).getValue().toString();
      } else if (component instanceof JComboBox && name.equals(component.getName())) {
        return ((JComboBox<?>) component).getSelectedItem().toString();
      } else if (component instanceof JRadioButton && name.equals(component.getName())) {
        JRadioButton radioButton = (JRadioButton) component;
        if (radioButton.isSelected()) {
          return radioButton.getText();
        }
      } else if (component instanceof JFileChooser) {
        return ((JFileChooser) component).getSelectedFile().getAbsolutePath();
      } else if (component instanceof JPanel) {
        String value = getInputValueFromComponents(((JPanel) component).getComponents(), name);
        if (value != null) {
          return value;
        }
      }
    }
    return null;
  }

  public static Integer toInt(String value) {
    if (value == null || value.isEmpty()) {
      return null;
    }
    try {
      return Integer.parseInt(value.replaceAll("\\u00A0", ""));
    } catch (NumberFormatException e) {
      e.printStackTrace();
      return null;
    }
  }

  public static Float toFloat(String value) {
    if (value == null || value.isEmpty()) {
      return null;
    }
    try {
      return Float.parseFloat(value.replaceAll("\\u00A0", "").replaceAll(",", "."));
    } catch (NumberFormatException e) {
      e.printStackTrace();
      return null;
    }
  }

  public static LocalDate toLocalDate(String value) {
    if (value == null || value.isEmpty()) {
      return null;
    }
    try {
      DateTimeFormatter f =
          new DateTimeFormatterBuilder()
              .parseCaseInsensitive()
              .append(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
              .toFormatter();
      return LocalDate.parse(value, f);
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}
