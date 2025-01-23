package ihm;

import com.formdev.flatlaf.FlatLightLaf;

public class Theme
	extends FlatLightLaf
{
	public static final String NAME = "Theme";

	public static boolean setup() {
		return setup( new Theme() );
	}

	public static void installLafInfo() {
		installLafInfo( NAME, Theme.class );
	}

	@Override
	public String getName() {
		return NAME;
	}
}
