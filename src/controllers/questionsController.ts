import { Request, Response } from "express";
import * as questionService from "../services/questionsService";

async function newQuestion(req: Request, res: Response) {
  try {
    const { question, student, tags, answered, submitAt } = req.body;
    const className = req.body.class;

    const result = await questionService.newQuestion({
      question: question,
      student: student,
      class: className,
      tags: tags,
      answered: answered,
      submitAt: submitAt,
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

async function getQuestionById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const result = await questionService.getQuestionById(id);
    res.status(201).send(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export { newQuestion, getQuestionById };
