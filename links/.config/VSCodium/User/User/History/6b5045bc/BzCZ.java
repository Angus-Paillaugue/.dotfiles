package com.app.themes;

import com.formdev.flatlaf.FlatLightLaf;
import com.formdev.flatlaf.themes.FlatMacLightLaf;

public class Main
		extends FlatLightLaf {
	public static final String NAME = "Main";

	public static boolean setup() {
		return setup(new Main());
	}

	public static void installLafInfo() {
		installLafInfo(NAME, Main.class);
	}

	@Override
	public String getName() {
		return NAME;
	}
}
