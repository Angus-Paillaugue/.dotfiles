package ihm;

import javax.swing.BorderFactory;
import javax.swing.JButton;

public class ButtonNeutral extends Button {
	private JButton button;

	/**
	 * @param text - Text displayed inside the button
	 * @param callback - On button click, this callback is called with a MouseEvent type parameter
	 */
	public ButtonNeutral(String text) {
		super(text, null);
	}

	/**
	 * @param text - Text displayed inside the button
	 * @param iconPath - The button icon path relative to the project
	 * @param callback - On button click, this callback is called with a MouseEvent type parameter
	 */
	public ButtonNeutral(String text, String iconPath) {
		super(text, iconPath);
	}
}
