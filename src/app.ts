import express from "express";
import cors from "cors";
import { auth } from "./middlewares/auth";
import * as questionController from "./controllers/questionsController";
import * as userController from "./controllers/usersController";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/questions", questionController.getUnansweredQuestions);
app.post("/questions", questionController.newQuestion);

app.get("/questions/:id", questionController.getQuestionById);

app.post("/questions/:id", auth, questionController.newAnswer);

app.post("/users", userController.newUser);

export default app;
