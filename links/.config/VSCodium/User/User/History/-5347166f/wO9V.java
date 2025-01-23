package ihm;

import javax.swing.JFormattedTextField;

public class InputField {

	private JFormattedTextField input;

	public InputField() {
		this.input = new JFormattedTextField();
	}
	/**
	 * @return JTextField - Construct the JTextField component
	 */
	public JFormattedTextField build() {
		return this.input;
	}

}
