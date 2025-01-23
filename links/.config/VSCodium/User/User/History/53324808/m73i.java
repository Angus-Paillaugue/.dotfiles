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
//		TODO: Fix constraints being violated
		k = dlCrSt.executeUpdate("DELETE FROM CRENEAU\n" + "WHERE HEUREDC = '11:00'\n"
				+ "  AND (DEBSEMC, JOURC, HEUREDC, GRPC) IN (\n" + "      SELECT DEBSEMC, JOURC, HEUREDC, GRPC\n"
				+ "      FROM ENSEIGNER\n" + "      WHERE ENSC = 'PGM'\n" + "  )");
		dlCrSt.close();
		System.out.println("Nombre de lignes modifies " + k);

		cn.close();
	}

}
