package ihm;

import javax.swing.JPasswordField;

public class PasswordField {

	private JPasswordField input;

	public PasswordField() {
		this.input = new JPasswordField(100);
	}

	/**
	 * @param cols - The width in columns of the JPasswordField
	 */
	public PasswordField(int cols) {
		this.input = new JPasswordField(cols);
	}

	/**
	 * @return JTextField - Construct the JPasswordField component
	 */
	public JPasswordField construct() {
		return this.input;
	}

}
