import {Request,Response} from "express"
import * as questionService from "../services/questionsService"

async function newQuestion(req:Request,res:Response) {
    res.send("olá")
    
}

export {newQuestion}