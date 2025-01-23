package jcdb;

import io.github.cdimascio.dotenv.Dotenv;

public class Env {
	public static String get(String key) {
		Dotenv dotenv = Dotenv.load();
		return dotenv.get(key);
	}
}
