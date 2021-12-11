import connection from "../database/database";
import { Token, UserToken } from "../interfaces/interfaces";

async function checkUser(token: Token) {
  const session = await connection.query(`SELECT id,name FROM users WHERE token = $1;`, [
    token.token,
  ]);
  return session.rows[0];
}

async function newUser(userInfo: UserToken): Promise<string> {
  const { name, token } = userInfo;
  const className = userInfo.class;

  const result = await connection.query(
    `INSERT INTO users (name,class,token) 
    VALUES ($1,$2,$3);`,
    [name, className, token]
  );

  if (!result) return null;

  return "Success";
}

export { newUser, checkUser };
