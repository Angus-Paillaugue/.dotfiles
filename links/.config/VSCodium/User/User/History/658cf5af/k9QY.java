package ihm;


public class ButtonPrimary extends Button {
	// private JButton button;


	/**
	 * @param text - Text displayed inside the button
	 * @param callback - On button click, this callback is called with a MouseEvent type parameter
	 */
	public ButtonPrimary(String text) {
		super(text, null);
		// this.button = build();

// this.button.setBorder(BorderFactory.createEmptyBorder(2, 5, 2, 5));
// this.button.setFont(Constants.BASE_FONT);
// this.button.setForeground(Constants.WHITE_COLOR);
// this.button.setBackground(Constants.PRIMARY_COLOR);
// this.button.putClientProperty("Button.buttonType", "default");

	}

	/**
	 * @param text - Text displayed inside the button
	 * @param iconPath - The button icon path relative to the project
	 * @param callback - On button click, this callback is called with a MouseEvent type parameter
	 */
	public ButtonPrimary(String text, String iconPath) {
		super(text, iconPath);
		// this.button = build();
		//
		// this.button.setBorder(BorderFactory.createEmptyBorder(2, 5, 2, 5));
		// this.button.setFont(Constants.BASE_FONT);
		// this.button.setForeground(Constants.WHITE_COLOR);
		// this.button.setBackground(Constants.PRIMARY_COLOR);
	}

}
