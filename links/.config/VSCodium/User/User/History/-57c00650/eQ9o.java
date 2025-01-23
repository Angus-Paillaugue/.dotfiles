package ihm;

import java.awt.Color;
import java.awt.Font;
import java.util.Locale;

import javax.swing.border.LineBorder;

public class Constants {

	public static final Color PRIMARY_COLOR = new Color(20, 83, 45);
	public static final Color BORDER_COLOR = new Color(212, 212, 212);
	public static final Color HEADING_COLOR = new Color(38, 38, 38);
	public static final Color BODY_COLOR = new Color(82, 82, 82);
	public static final Color ERROR_COLOR = new Color(220, 38, 38);
	public static final Color WHITE_COLOR = new Color(255, 255, 255);
	public static final Color WINDOW_BG_COLOR = new Color(255, 255, 255);

	public static final LineBorder BORDER = new LineBorder(Constants.BODY_COLOR, 1);

	public static final Font SMALL_FONT = new Font("Arial", Font.BOLD, 12);
	public static final Font BASE_FONT = new Font("Arial", Font.BOLD, 14);
	public static final Font HEADING_FONT = new Font("Arial", Font.BOLD, 20);
	public static final Font WINDOW_TITLE_FONT = new Font("Arial", Font.BOLD, 30);

	public static final int BR_FULL = 9999;
	public static final int BR_SM = 10;
	public static final int BR_MD = 15;
	public static final int BR_LG = 20;

	public static final String ICONS_PATH = "src/main/resources/icons/";

	public static final Locale LOCALE = Locale.FRANCE;
}
