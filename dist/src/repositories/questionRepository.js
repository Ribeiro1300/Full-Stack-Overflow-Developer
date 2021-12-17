"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getUnansweredQuestions = exports.answer = exports.getQuestionById = exports.newQuestion = void 0;
var database_1 = __importDefault(require("../database/database"));
function newQuestion(info) {
    return __awaiter(this, void 0, void 0, function () {
        var question, student, tags, answered, submitAt, className, result, currentId, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    question = info.question, student = info.student, tags = info.tags, answered = info.answered, submitAt = info.submitAt;
                    className = info["class"];
                    return [4 /*yield*/, database_1["default"].query("INSERT INTO questions (question,student,class,tags,answered,\"submitAt\") VALUES ($1,$2,$3,$4,$5,$6);", [question, student, className, tags, answered, submitAt])];
                case 1:
                    result = _a.sent();
                    if (!result)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, database_1["default"].query("SELECT id FROM questions WHERE question=$1 AND student=$2 AND class = $3;", [question, student, className])];
                case 2:
                    currentId = _a.sent();
                    id = currentId.rows[0];
                    return [2 /*return*/, id];
            }
        });
    });
}
exports.newQuestion = newQuestion;
function getQuestionById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var result, fullResult, answeredQuestion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1["default"].query("SELECT * FROM questions WHERE id=$1;", [id])];
                case 1:
                    result = _a.sent();
                    delete result.rows[0].id;
                    if (!result.rows[0].answered)
                        return [2 /*return*/, result.rows[0]];
                    return [4 /*yield*/, database_1["default"].query("SELECT questions.*, answers.\"answeredAt\",answers.\"answeredBy\",answers.answer\n     FROM questions JOIN answers ON questions.id = answers.question_id\n      WHERE questions.id = $1;", [id])];
                case 2:
                    fullResult = _a.sent();
                    answeredQuestion = fullResult.rows[0];
                    delete answeredQuestion.id, answeredQuestion.question_id, answeredQuestion.user_id;
                    return [2 /*return*/, answeredQuestion];
            }
        });
    });
}
exports.getQuestionById = getQuestionById;
function getUnansweredQuestions() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1["default"].query("SELECT id,question,student,class,\"submitAt\" FROM questions WHERE answered = false;")];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows];
            }
        });
    });
}
exports.getUnansweredQuestions = getUnansweredQuestions;
function answer(answerInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var question_id, user_id, answeredAt, answeredBy, answer, checkQuestion, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    question_id = answerInfo.question_id, user_id = answerInfo.user_id, answeredAt = answerInfo.answeredAt, answeredBy = answerInfo.answeredBy, answer = answerInfo.answer;
                    return [4 /*yield*/, database_1["default"].query("SELECT answered FROM questions WHERE id=$1;", [
                            question_id,
                        ])];
                case 1:
                    checkQuestion = _a.sent();
                    if (checkQuestion.rows[0].answered)
                        return [2 /*return*/, "Questão já respondida!"];
                    return [4 /*yield*/, database_1["default"].query("UPDATE questions SET answered = true WHERE id =$1", [question_id])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, database_1["default"].query("INSERT INTO answers (question_id,user_id,\"answeredAt\",\"answeredBy\",answer) VALUES ($1,$2,$3,$4,$5);", [question_id, user_id, answeredAt, answeredBy, answer])];
                case 3:
                    result = _a.sent();
                    if (!result)
                        return [2 /*return*/, null];
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.answer = answer;
