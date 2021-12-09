import { Id } from "../interfaces/interfaces";
import * as questionRepository from "../repositories/questionRepository";
import dayjs from "dayjs";

async function newQuestion(
  question: string,
  student: string,
  className: string,
  tags: string
): Promise<Id> {
  const result = await questionRepository.newQuestion(question, student, className, tags);

  if (!result) {
    return null;
  }
  return result;
}

export { newQuestion };
