package ihm;

import javax.swing.JTextField;

public class InputField {

	private JTextField input;

	public InputField() {
		this.input = new JFo(20);
	}

	/**
	 * @param cols - The width in columns of the JTextField
	 */
	public InputField(int cols) {
		this.input = new JTextField(cols);
	}

	/**
	 * @return JTextField - Construct the JTextField component
	 */
	public JTextField construct() {
		return this.input;
	}

}
