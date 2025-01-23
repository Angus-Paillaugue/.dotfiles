import java.sql.Connection;
import java.sql.SQLException;

import oracle.jdbc.pool.OracleDataSource;

public class CictOracleDataSource extends OracleDataSource {

	public CictOracleDataSource() throws SQLException {
		this.setURL("jdbc:oracle:thin:@telline.univ-tlse3.fr:1521:etupre");
		this.setUser("PLN5132A");
		this.setPassword("$iutinfo");
	}

	public static void main(String[] args) throws SQLException {
		OracleDataSource bd = new CictOracleDataSource();
		Connection cn = bd.getConnection();

		cn.close();
	}
}
