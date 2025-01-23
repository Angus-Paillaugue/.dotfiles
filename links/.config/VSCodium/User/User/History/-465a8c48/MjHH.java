package utils;

import java.awt.Component;
import javax.swing.JComboBox;
import javax.swing.JFormattedTextField;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.JTextField;

public class VuesUtils {
	public static String getInputValue(JPanel pane, String name) {
		return getInputValueFromComponents(pane.getComponents(), name);
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
		try {
			String[] splitText = value.split(" ");
			int[] numbers = new int[splitText.length];
			for (int i = 0; i < splitText.length; i++) {
				numbers[i] = Integer.parseInt(splitText[i]);
			}
			System.out.println(numbers.toString());
			return Integer.parseInt(numbers.toString());
		} catch (NumberFormatException e) {
			System.out.println(e);
			return null;
		}
	}
}
