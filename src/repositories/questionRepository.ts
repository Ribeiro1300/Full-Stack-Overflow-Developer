import connection from "../database/database";
import { answeredQuestion, CompleteQuestion, Id, Question } from "../interfaces/interfaces";

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

export { newQuestion, getQuestionById };
