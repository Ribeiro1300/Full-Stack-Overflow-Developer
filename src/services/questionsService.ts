import { Id, Question, answeredQuestion } from "../interfaces/interfaces";
import * as questionRepository from "../repositories/questionRepository";
import dayjs from "dayjs";
import { QueryResult } from "pg";

async function newQuestion(info: Question): Promise<Id> {
  const { question, student, tags } = info;
  const className = info.class;

  const result = await questionRepository.newQuestion({
    question: question,
    student: student,
    class: className,
    tags: tags,
    answered: false,
    submitAt: dayjs().format("YYYY-MM-DD HH:mm"),
  });

  if (!result) {
    return null;
  }
  return result;
}

async function getQuestionById(id: number): Promise<answeredQuestion | Question> {
  const result = await questionRepository.getQuestionById(id);
  return result;
}

async function getUnansweredQuestions(): Promise<QueryResult[]> {
  const result = await questionRepository.getUnansweredQuestions();
  return result;
}

async function answer(
  question_id: number,
  user_id: number,
  answeredBy: string,
  answer: string
): Promise<boolean | string> {
  const result = await questionRepository.answer({
    question_id: question_id,
    user_id: user_id,
    answeredAt: dayjs().format("YYYY-MM-DD HH:mm"),
    answeredBy: answeredBy,
    answer: answer,
  });
  if (!result) return null;
  if (result === "Questão já respondida!") return "Questão já respondida!";

  return result;
}
export { newQuestion, getQuestionById, answer, getUnansweredQuestions };
