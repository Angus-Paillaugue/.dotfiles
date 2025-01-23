package jcdb;

import io.github.cdimascio.dotenv.Dotenv;

public class Env {
	/**
	 * Retrieves the value of the specified environment variable.
	 *
	 * This method loads the environment variables from a .env file using the Dotenv library
	 * and returns the value associated with the provided key.
	 *
	 * @param key the name of the environment variable to retrieve
	 * @return the value of the specified environment variable, or null if the variable is not found
	 */
	public static String get(String key) {
		Dotenv dotenv = Dotenv.load();
		return dotenv.get(key);
	}
}
