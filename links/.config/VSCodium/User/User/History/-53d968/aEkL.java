import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Database {
	private static Database instance;
	private Connection connection;

	// Database URL, username, and password
	private final String url = "jdbc:mysql://localhost:3306/skillforge";
	private final String username = Env.get("DB_USERNAME");
	private final String password = Env.get("DB_PASSWORD");

	// Private constructor to prevent instantiation
	private Database() throws SQLException {
		try {
			this.connection = DriverManager.getConnection(this.url, this.username, this.password);
		} catch (SQLException e) {
			throw new SQLException("Failed to create the database connection.", e);
		}
	}

	// Get the Singleton instance of the Database
	public static Database getInstance() throws SQLException {
		if (instance == null) {
			instance = new Database();
		} else if (instance.getConnection().isClosed()) {
			instance = new Database();
		}
		return instance;
	}

	// Method to get the database connection
	public Connection getConnection() {
		return this.connection;
	}

	// Method to fetch only the first row from a query result, with optional
	// parameters
	public Map<String, Object> getFirst(String query, List<Object> params) {
		Map<String, Object> row = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;

		try {
			preparedStatement = this.connection.prepareStatement(query);

			// If params are provided, set them in the prepared statement
			if (params != null && !params.isEmpty()) {
				for (int i = 0; i < params.size(); i++) {
					preparedStatement.setObject(i + 1, params.get(i));
				}
			}

			resultSet = preparedStatement.executeQuery();

			// Retrieve metadata for column names and fetch the first row if available
			if (resultSet.next()) {
				row = new HashMap<>();
				int columnCount = resultSet.getMetaData().getColumnCount();
				for (int i = 1; i <= columnCount; i++) {
					String columnName = resultSet.getMetaData().getColumnName(i);
					Object columnValue = resultSet.getObject(i);
					row.put(columnName, columnValue);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				if (resultSet != null) {
					resultSet.close();
				}
				if (preparedStatement != null) {
					preparedStatement.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return row;
	}

	// Method to execute a query and return the results, with optional parameters
	public List<Map<String, Object>> executeQuery(String query, List<Object> params) {
		List<Map<String, Object>> results = new ArrayList<>();
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;

		try {
			preparedStatement = this.connection.prepareStatement(query);

			// If params are provided, set them in the prepared statement
			if (params != null && !params.isEmpty()) {
				for (int i = 0; i < params.size(); i++) {
					preparedStatement.setObject(i + 1, params.get(i));
				}
			}

			resultSet = preparedStatement.executeQuery();

			// Retrieve metadata for column names and fetch all rows
			int columnCount = resultSet.getMetaData().getColumnCount();
			while (resultSet.next()) {
				Map<String, Object> row = new HashMap<>();
				for (int i = 1; i <= columnCount; i++) {
					String columnName = resultSet.getMetaData().getColumnName(i);
					Object columnValue = resultSet.getObject(i);
					row.put(columnName, columnValue);
				}
				results.add(row);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				if (resultSet != null) {
					resultSet.close();
				}
				if (preparedStatement != null) {
					preparedStatement.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return results;
	}

	// Close the database connection
	public void closeConnection() {
		try {
			if (this.connection != null && !this.connection.isClosed()) {
				this.connection.close();
				System.out.println("Connection closed.");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
