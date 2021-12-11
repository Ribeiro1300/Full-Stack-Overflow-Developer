import { Request, Response } from "express";
import * as usersRepository from "../repositories/usersRepository";

async function auth(req: Request, res: Response, next: any) {
  try {
    const authorization = req.headers["authorization"];
    const token = authorization?.split("Bearer ")[1];

    const session = await usersRepository.checkUser({ token: token });
    if (session.length === 0) {
      return res.sendStatus(401);
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }

  next();
}

export { auth };
