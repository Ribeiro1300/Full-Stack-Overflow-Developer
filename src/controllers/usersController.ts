import { Request, Response } from "express";
import * as usersService from "../services/usersService";

async function newUser(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const className = req.body.class;

    const result = await usersService.newUser({ name: name, class: className });

    if (!result) res.sendStatus(404);

    res.status(201).send(result.token);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export { newUser };
