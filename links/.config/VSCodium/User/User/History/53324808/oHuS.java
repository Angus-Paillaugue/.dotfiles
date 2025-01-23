import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import oracle.jdbc.pool.OracleDataSource;

public class TpJdbcMaj {

	public static void main(String[] args) throws SQLException {
		OracleDataSource bd = new CictOracleDataSource();
		Connection cn = bd.getConnection();
		System.out.println("Connexion au SGBD établie");

		Statement st = cn.createStatement();
		int k = st.executeUpdate("UPDATE ENSEIGNANT\n" + "SET NBHDISP = NBHDISP + 1.5\n" + "WHERE IDENSEIGN = 'PGM'");
		System.out.println("Nombre de lignes modifies " + k);
		st.close();

		Statement dlCrSt = cn.createStatement();
		try {
			// Delete dependent records in the child table
			int affectedRows = dlCrSt.executeUpdate(
					"DELETE FROM AFFECTER WHERE (DEBSEMC, GRPC) IN (" +
							"SELECT DEBSEMC, GRPC FROM CRENEAU WHERE HEUREDC = '11:00' AND " +
							"(DEBSEMC, JOURC, HEUREDC, GRPC) IN (" +
							"SELECT DEBSEMC, JOURC, HEUREDC, GRPC FROM ENSEIGNER WHERE ENSC = 'PGM'))");
			System.out.println("Nombre de lignes supprimées dans AFFECTER: " + affectedRows);

			// Delete records from the CRENEAU table
			k = dlCrSt.executeUpdate(
					"DELETE FROM CRENEAU WHERE HEUREDC = '11:00' AND " +
							"(DEBSEMC, JOURC, HEUREDC, GRPC) IN (" +
							"SELECT DEBSEMC, JOURC, HEUREDC, GRPC FROM ENSEIGNER WHERE ENSC = 'PGM')");
			System.out.println("Nombre de lignes supprimées dans CRENEAU: " + k);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			dlCrSt.close();
		}

		cn.close();
	}

}
