import connection from "../database/database";
import { UserToken } from "../interfaces/interfaces";

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

export { newUser };
