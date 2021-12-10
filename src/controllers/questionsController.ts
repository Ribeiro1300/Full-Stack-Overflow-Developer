import { Request, Response } from "express";
import * as questionService from "../services/questionsService";

async function newQuestion(req: Request, res: Response) {
  try {
    const { question, student, tags } = req.body;
    const className = req.body.class;

    const result = await questionService.newQuestion({
      question: question,
      student: student,
      class: className,
      tags: tags,
    });

    if (!result) {
      res.sendStatus(404);
    }

    res.send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { newQuestion };
