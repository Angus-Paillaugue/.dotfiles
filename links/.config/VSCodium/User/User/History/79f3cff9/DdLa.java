package ihm;

import com.formdev.flatlaf.FlatLightLaf;

public class AppTheme
	extends FlatLightLaf
{
	public static final String NAME = "AppTheme";

	public static boolean setup() {
		return setup( new AppTheme() );
	}

	public static void installLafInfo() {
		installLafInfo(NAME, AppTheme.class);
	}

	@Override
	public String getName() {
		return NAME;
	}
}
