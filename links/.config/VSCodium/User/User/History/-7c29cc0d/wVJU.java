package components;

import javax.swing.ImageIcon;
import javax.swing.JButton;

public class Button{

	private JButton button;

	/**
	 * @param text - Text displayed inside the button
	 */
	public Button(String text) {
		this.button = new JButton();
		this.button.setText(text);
	}

	/**
	 * @param text - Text displayed inside the button
	 * @param iconPath - The button icon path relative to the project
	 */
	public Button(String text, String iconPath) {
		if(iconPath != null) {
			ImageIcon icon = new ImageIcon(iconPath);
			this.button = new JButton(icon);
		}else {
			this.button = new JButton();
		}
		this.button.setText(text);
	}

	/**
	 * @return JButton - Construct the JButton component
	 */
	public JButton build() {
		return this.button;
	}

}
