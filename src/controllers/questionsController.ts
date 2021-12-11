import { Request, Response } from "express";
import * as questionService from "../services/questionsService";
import * as usersRepository from "../repositories/usersRepository";

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
  } catch (e) {
    console.log(e);
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

async function getUnansweredQuestions(req: Request, res: Response) {
  try {
    const result = await questionService.getUnansweredQuestions();
    if (!result) res.sendStatus(404);

    res.send(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function newAnswer(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { answer } = req.body;

    const authorization = req.headers["authorization"];
    const token = authorization?.split("Bearer ")[1];

    const userInfo = await usersRepository.checkUser({ token: token });

    const result = await questionService.answer(id, userInfo.id, userInfo.name, answer);

    if (!result) res.sendStatus(404);
    if (result === "Questão já respondida!") return res.sendStatus(409);

    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export { newQuestion, getQuestionById, newAnswer, getUnansweredQuestions };
