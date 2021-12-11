import { Id, Question, answeredQuestion, CompleteQuestion } from "../interfaces/interfaces";
import * as questionRepository from "../repositories/questionRepository";
import dayjs from "dayjs";

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

export { newQuestion, getQuestionById };
