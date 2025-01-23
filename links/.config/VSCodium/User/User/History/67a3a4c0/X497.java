import java.util.Map;
import io.github.cdimascio.dotenv.Dotenv;

public class Env {
	public static String get(String key) {
		Map<String, String> env = System.getenv();
		return env.get(key);
	}
}
