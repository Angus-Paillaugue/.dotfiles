package jcdb;

import java.io.FileReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import utils.Logger;

import java.io.File;
import java.io.IOException;

/**
 * The Connector class is a Singleton that manages the database connection.
 * It provides methods to get the connection instance, execute queries, and
 * fetch results.
 *
 * @example
 * @formatter:off
 * <pre>{@code
 * try {
 *   Connector db = Connector.getInstance();
 *   String query = "SELECT * FROM users WHERE id = ?";
 *   List<Map<String, Object>> results = db.executeQuery(query,
 *   Arrays.asList(1));
 *   results.forEach(System.out::println);
 *   db.closeConnection();
 * } catch (SQLException e) {
 *   System.out.println("✗ "+e.getMessage());
 * }
 * }</pre>
 * @formatter:on
 */
public class Connector {

	private static Connector instance;
	private Connection connection;
	// Database URL, username, and password
	private final String url = "jdbc:sqlite:database.db";

	/**
	 * Private constructor for the Connector class.
	 *
	 * @throws SQLException if the username or password is not provided, or if the
	 *                      database connection fails.
	 */
	private Connector() throws SQLException {
		try {
			this.connection = DriverManager.getConnection(this.url);
			if (Env.get("DEV") != null) {
				Logger.log("Connection created");
			}
		} catch (SQLException e) {
			throw new SQLException("Failed to create the database connection.", e);
		}
	}

	/**
	 * Returns the singleton instance of the Connector class. If the instance is
	 * null or the
	 * existing connection is closed, a new instance of the Connector is created.
	 *
	 * @return the singleton instance of the Connector
	 * @throws SQLException if a database access error occurs
	 */
	public static Connector getInstance() throws SQLException {
		if (instance == null) {
			instance = new Connector();
		} else if (instance.getConnection().isClosed()) {
			instance = new Connector();
		}
		return instance;
	}

	/**
	 * Retrieves the current database connection.
	 *
	 * @return the current {@link Connection} object.
	 */
	public Connection getConnection() {
		return this.connection;
	}

	/**
	 * Counts the number of parameter placeholders ('?') in the given SQL query
	 * string.
	 *
	 * @param query the SQL query string to be analyzed
	 * @return the number of parameter placeholders in the query
	 */
	private int getNbParams(String query) {
		int nbParams = 0;
		for (int i = 0; i < query.length(); i++) {
			if (query.charAt(i) == '?') {
				nbParams++;
			}
		}
		return nbParams;
	}

	/**
	 * Executes the given SQL query with the provided parameters and retrieves the
	 * first row of the result set.
	 *
	 * @param query  The SQL query to be executed.
	 * @param params The list of parameters to be set in the prepared statement. Can
	 *               be null or empty if no parameters are needed.
	 * @return A map representing the first row of the result set, where the keys
	 *         are column names and the values are column values.
	 *         Returns null if no rows are found.
	 * @throws IllegalArgumentException If the number of parameters does not match
	 *                                  the number of placeholders in the query.
	 */
	public Map<String, Object> getFirst(String query, List<Object> params) throws IllegalArgumentException {
		Map<String, Object> row = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;

		if (params != null && getNbParams(query) != params.size()) {
			throw new IllegalArgumentException(
					"The number of parameters does not match the number of placeholders in the query.");
		}

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
			Logger.error(e);
		} finally {
			try {
				if (resultSet != null) {
					resultSet.close();
				}
				if (preparedStatement != null) {
					preparedStatement.close();
				}
			} catch (SQLException e) {
				Logger.error(e);
			}
		}
		return row;
	}

	/**
	 * Executes a SQL query with the given parameters and returns the results as a
	 * list of maps.
	 * Each map represents a row, with column names as keys and column values as
	 * values.
	 *
	 * @param query  the SQL query to be executed
	 * @param params the list of parameters to be set in the prepared statement; can
	 *               be null or empty if no parameters are needed
	 * @return a list of maps, where each map represents a row of the result set
	 * @throws IllegalArgumentException if the number of parameters does not match
	 *                                  the number of placeholders in the query
	 */
	public List<Map<String, Object>> executeQuery(String query, List<Object> params) throws IllegalArgumentException {
		List<Map<String, Object>> results = new ArrayList<>();
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;

		if (params != null && getNbParams(query) != params.size()) {
			throw new IllegalArgumentException(
					"The number of parameters does not match the number of placeholders in the query.");
		}

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
			Logger.error(e);
		} finally {
			try {
				if (resultSet != null) {
					resultSet.close();
				}
				if (preparedStatement != null) {
					preparedStatement.close();
				}
			} catch (SQLException e) {
				Logger.error(e);
			}
		}
		return results;
	}

	/**
	 * Executes an update operation (UPDATE or DELETE) on the
	 * database
	 * using the provided SQL statement and parameters.
	 *
	 * @param sql    the SQL statement to be executed.
	 * @param params the list of parameters to be set in the prepared statement. If
	 *               no parameters
	 *               are needed, this can be null or an empty list.
	 * @throws IllegalArgumentException if the number of parameters does not match
	 *                                  the number of placeholders in the query
	 */
	public void executeUpdate(String sql, List<Object> params) throws IllegalArgumentException {
		PreparedStatement preparedStatement = null;

		if (params != null && getNbParams(sql) != params.size()) {
			throw new IllegalArgumentException(
					"The number of parameters does not match the number of placeholders in the query.");
		}

		try {
			preparedStatement = this.connection.prepareStatement(sql);

			// If params are provided, set them in the prepared statement
			if (params != null && !params.isEmpty()) {
				for (int i = 0; i < params.size(); i++) {
					preparedStatement.setObject(i + 1, params.get(i));
				}
			}

			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			Logger.error(e);
		} finally {
			try {
				if (preparedStatement != null) {
					preparedStatement.close();
				}
			} catch (SQLException e) {
				Logger.error(e);
			}
		}
	}

	/**
	 * Closes the current database connection if it is open.
	 * If the connection is successfully closed and the environment variable "DEV"
	 * is set,
	 * a message "Connection closed" will be printed to the console.
	 *
	 * This method catches and prints any SQLException that occurs during the
	 * closing process.
	 */
	public void closeConnection() {
		try {
			if (this.connection != null && !this.connection.isClosed()) {
				if (Env.get("DEV") != null) {
					Logger.log("Connection closed");
				}
				this.connection.close();
			}
		} catch (SQLException e) {
			Logger.error(e);
		}
	}

	/**
	 * Creates the database by executing SQL queries from a file.
	 *
	 * This method reads SQL statements from the "createDatabase.sql" file,
	 * splits them by line, and executes each query to create the database.
	 * If an SQLException occurs during the process, the stack trace is printed.
	 *
	 * Usage:
	 * <pre>
	 * {@code
	 * Connector.createDatabase();
	 * }
	 * </pre>
	 *
	 * Note: Ensure that the "createDatabase.sql" file is present and contains
	 * valid SQL statements.
	 */
	public static void createDatabase() {
		if(Connector.fileExists("database.db")) {
			Logger.success("Database already exists.");
			return;
		}
		String sql = readFile("createDatabase.sql");
		if(sql == null) {
			Logger.error("Failed to read SQL file.");
			return;
		}
		try {
			Connector db = Connector.getInstance();
			String[] queries = sql.split(";");
			for (String query : queries) {
				Logger.log(query);
				db.executeUpdate(query.trim(), null);
			}
			// db.executeUpdate(sql, null);
			db.closeConnection();

			Logger.success("Database created successfully.");
		} catch (SQLException e) {
			Logger.error(e);
		}
	}

	/**
	 * Deletes the database file named "database.db" if it exists.
	 * <p>
	 * This method checks if the database file exists. If it does not exist,
	 * it prints a message indicating that the database was not found and returns.
	 * If the file exists, it attempts to delete it and prints a success or failure message
	 * based on the outcome of the deletion.
	 * </p>
	 */
	public static void deleteDatabase() {
		if(!Connector.fileExists("database.db")) {
			Logger.error("Database not found, nothing to delete.");
			return;
		}
		File databaseFile = new File("database.db");
		if(databaseFile.delete()) {
			Logger.success("Database deleted successfully.");
		} else {
			Logger.error("Failed to delete database.");
		}
	}

	/**
	 * Reads the content of a file and returns it as a String.
	 *
	 * @param filename the name of the file to read
	 * @return the content of the file as a String, or null if an error occurs
	 */
	private static String readFile(String filename)
	{
		if(!Connector.fileExists(filename)) {
			Logger.error("File not found: " + filename);
			return null;
		}
		String content = null;
		File file = new File(filename);
		FileReader reader = null;
		try {
			reader = new FileReader(file);
			char[] chars = new char[(int) file.length()];
			reader.read(chars);
			content = new String(chars);
			reader.close();
		} catch (IOException e) {
			Logger.error(e);
		}
		return content;
	}

	/**
	 * Checks if a file exists at the specified path.
	 *
	 * @param path the path to the file
	 * @return {@code true} if the file exists, {@code false} otherwise
	 */
	private static Boolean fileExists(String path) {
		File file = new File(path);
		return file.exists();
	}
}
