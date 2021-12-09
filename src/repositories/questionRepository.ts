import { QueryResult } from "pg";
import connection from "../database/database";
import { Id } from "../interfaces/interfaces";

async function newQuestion(
  question: string,
  student: string,
  className: string,
  tags: string
): Promise<Id> {
  const result = await connection.query(
    "INSERT INTO questions (question,student,class,tags) VALUES ($1,$2,$3,$4);",
    [question, student, className, tags]
  );
  if (!result) {
    return null;
  }

  const currentId = await connection.query(
    "SELECT id FROM questions WHERE question=$1 AND student=$2 AND class = $3;",
    [question, student, className]
  );
  const id = currentId.rows[0];
  return id;
}

export { newQuestion };
