import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import oracle.jdbc.pool.OracleDataSource;

public class TpJdbcMaj {

	public static void main(String[] args) throws SQLException {
		OracleDataSource bd = new CictOracleDataSource();
		Connection cn = bd.getConnection();
		cn.setAutoCommit(false); // Désactive l'autocommit
		System.out.println("Connexion au SGBD établie");

		Statement st = cn.createStatement();
		try {
//			Question 1, 2
			int k = st.executeUpdate("UPDATE ENSEIGNANT SET NBHDISP = NBHDISP + 1.5 WHERE IDENSEIGN = 'PGM'");
			System.out.println("Nombre de lignes modifiées : " + k);

//			Question 3, 4
			int deletedAffecter = st.executeUpdate("DELETE FROM AFFECTER WHERE HEUREDC = '11'");
			int deletedEnseigner = st.executeUpdate("DELETE FROM ENSEIGNER WHERE HEUREDC = '11'");
			System.out.println("Nombre de lignes supprimées dans AFFECTER : " + deletedAffecter);
			System.out.println("Nombre de lignes supprimées dans ENSEIGNER : " + deletedEnseigner);

			int deletedCreneau = st.executeUpdate("DELETE FROM CRENEAU WHERE HEUREDC = '11'");
			System.out.println("Nombre de créneaux supprimés : " + deletedCreneau);

			cn.rollback();
			System.out.println("Rollback effectué, modifications annulées.");
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			st.close();
			cn.close();
		}

//		Question 5, 6
		Statement st2 = cn.createStatement();
		try {
			int inserted = st2.executeUpdate("INSERT INTO ENSEIGNANT (IDENSEIGN, NOM, PRENOM, GRADE) "
					+ "VALUES ('TST', 'Nom', 'Prenom', 'MCF')");
			System.out.println("Nombre de lignes insérées : " + inserted);

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			st2.close();
			cn.close();
		}

	}
}
