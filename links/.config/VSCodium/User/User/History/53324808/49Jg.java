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
		int k = st.executeUpdate("UPDATE ENSEIGNANT SET NBHDISP = NBHDISP + 1.5 WHERE IDENSEIGN = 'PGM'");
		System.out.println("Nombre de lignes modifiées : " + k);

		// Suppression des créneaux planifiés à 11 heures
		int deleted = st.executeUpdate("DELETE FROM CRENEAU WHERE HEUREDC = 11");
		System.out.println("Nombre de créneaux supprimés : " + deleted);

		st.close();
		cn.close();
	}
}
