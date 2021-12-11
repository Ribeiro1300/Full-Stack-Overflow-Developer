import { QueryResult } from "pg";
import connection from "../database/database";
import {
  answeredQuestion,
  CompleteQuestion,
  Id,
  Question,
  answerInfo,
} from "../interfaces/interfaces";

async function newQuestion(info: CompleteQuestion): Promise<Id> {
  const { question, student, tags, answered, submitAt } = info;
  const className = info.class;

  const result = await connection.query(
    `INSERT INTO questions (question,student,class,tags,answered,"submitAt") VALUES ($1,$2,$3,$4,$5,$6);`,
    [question, student, className, tags, answered, submitAt]
  );

  if (!result) return null;

  const currentId = await connection.query(
    "SELECT id FROM questions WHERE question=$1 AND student=$2 AND class = $3;",
    [question, student, className]
  );
  const id = currentId.rows[0];
  return id;
}

async function getQuestionById(id: number): Promise<answeredQuestion | Question> {
  const result = await connection.query("SELECT * FROM questions WHERE id=$1;", [id]);

  delete result.rows[0].id;

  if (!result.rows[0].answered) return result.rows[0];

  const fullResult = await connection.query(
    `SELECT questions.*, answers."answeredAt",answers."answeredBy",answers.answer
     FROM questions JOIN answers ON questions.id = answers.question_id
      WHERE questions.id = $1;`,
    [id]
  );
  const answeredQuestion = fullResult.rows[0];
  delete answeredQuestion.id, answeredQuestion.question_id, answeredQuestion.user_id;
  return answeredQuestion;
}

async function answer(answerInfo: answerInfo): Promise<any> {
  const { question_id, user_id, answeredAt, answeredBy, answer } = answerInfo;

  const checkQuestion = await connection.query(`SELECT answered FROM questions WHERE id=$1;`, [
    question_id,
  ]);
  
  if (checkQuestion.rows[0].answered) return "Questão já respondida!";

  await connection.query(`UPDATE questions SET answered = true WHERE id =$1`, [question_id]);

  const result = await connection.query(
    `INSERT INTO answers (question_id,user_id,"answeredAt","answeredBy",answer) VALUES ($1,$2,$3,$4,$5);`,
    [question_id, user_id, answeredAt, answeredBy, answer]
  );

  if (!result) return null;

  return result;
}
export { newQuestion, getQuestionById, answer };
