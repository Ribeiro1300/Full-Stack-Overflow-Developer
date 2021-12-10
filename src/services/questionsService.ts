import { Id, Question } from "../interfaces/interfaces";
import * as questionRepository from "../repositories/questionRepository";
import dayjs from "dayjs";

async function newQuestion(info: Question): Promise<Id> {
  const { question, student, tags, answered, submitAt } = info;
  const className = info.class;

  const result = await questionRepository.newQuestion({
    question: question,
    student: student,
    class: className,
    tags: tags,
    answered: answered,
    submitAt: submitAt,
  });

  if (!result) {
    return null;
  }
  return result;
}

async function getQuestionById(id: number) {
  const result = await questionRepository.getQuestionById(id);
  return result;
}

export { newQuestion, getQuestionById };
