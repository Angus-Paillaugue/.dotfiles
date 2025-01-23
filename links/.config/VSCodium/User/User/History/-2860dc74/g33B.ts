import DB from '.';

class User {
  id?: number;
  username: string;
  passwordHash: string;

  constructor(data: User) {
    this.id = data.id;
    this.username = data.username;
    this.passwordHash = data.passwordHash;
  }
}

class UserDAO {
  #db = DB.getInstance();

  #convertToUser(row: any): User {
    return new User({
      id: row.id,
      username: row.username,
      passwordHash: row.passwordHash
    });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const sql = `
        SELECT *
        FROM users
        WHERE username = ?
      `;
      const rows = await this.#db.query(sql, [username]);
      if (rows.length === 0) {
        return null;
      }
      return this.#convertToUser(rows[0]);
    } catch (error) {
      console.error('Error getting user by username:', error);
      return null;
    }
  }

  async insertUser(user: User): Promise<User> {
    const sql = `
      INSERT INTO users (username, passwordHash)
      VALUES (?, ?)
    `;
    const params = [user.username, user.passwordHash];
    const insertId = await this.#db.execute(sql, params);
    user.id = insertId;
    return user;
  }

  async updateUser(user: User): Promise<User> {
    const sql = `
      UPDATE users
      SET username = ?, passwordHash = ?
      WHERE id = ?
    `;
    const params = [user.username, user.passwordHash, user.id];
    await this.#db.execute(sql, params);
    return user;
  }
}

export default new UserDAO();
