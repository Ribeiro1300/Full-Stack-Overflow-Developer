import { Id, Question } from "../interfaces/interfaces";
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
  });

  if (!result) {
    return null;
  }
  return result;
}

export { newQuestion };
