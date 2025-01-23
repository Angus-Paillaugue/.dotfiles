import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class TestDB {
	// Main method to demonstrate usage
	public static void main(String[] args) {
		try {
			Connector db = Connector.getInstance();

			// Example with parameters (pass parameters as a list)
			String query = "SELECT * FROM users WHERE id = ?";
			List<Map<String, Object>> results = db.executeQuery(query, Arrays.asList(1));
			results.forEach(System.out::println);

			// Example without parameters (pass an empty list)
			String queryNoParams = "SELECT * FROM users";
			List<Map<String, Object>> resultsNoParams = db.executeQuery(queryNoParams, null);
			resultsNoParams.forEach(System.out::println);

			db.closeConnection();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
