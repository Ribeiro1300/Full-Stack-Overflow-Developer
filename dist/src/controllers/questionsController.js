"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.__esModule = true;
exports.getUnansweredQuestions = exports.newAnswer = exports.getQuestionById = exports.newQuestion = void 0;
var questionService = __importStar(require("../services/questionsService"));
var usersRepository = __importStar(require("../repositories/usersRepository"));
function newQuestion(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, question, student, tags, className, result, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, question = _a.question, student = _a.student, tags = _a.tags;
                    className = req.body["class"];
                    return [4 /*yield*/, questionService.newQuestion({
                            question: question,
                            student: student,
                            "class": className,
                            tags: tags
                        })];
                case 1:
                    result = _b.sent();
                    if (!result) {
                        res.sendStatus(404);
                    }
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    console.log(e_1);
                    res.sendStatus(500);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.newQuestion = newQuestion;
function getQuestionById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, result, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = Number(req.params.id);
                    return [4 /*yield*/, questionService.getQuestionById(id)];
                case 1:
                    result = _a.sent();
                    res.status(201).send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    console.log(e_2);
                    res.sendStatus(500);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getQuestionById = getQuestionById;
function getUnansweredQuestions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, questionService.getUnansweredQuestions()];
                case 1:
                    result = _a.sent();
                    if (!result)
                        res.sendStatus(404);
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    console.log(e_3);
                    res.sendStatus(500);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUnansweredQuestions = getUnansweredQuestions;
function newAnswer(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, answer, authorization, token, userInfo, result, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    id = Number(req.params.id);
                    answer = req.body.answer;
                    authorization = req.headers["authorization"];
                    token = authorization === null || authorization === void 0 ? void 0 : authorization.split("Bearer ")[1];
                    return [4 /*yield*/, usersRepository.checkUser({ token: token })];
                case 1:
                    userInfo = _a.sent();
                    return [4 /*yield*/, questionService.answer(id, userInfo.id, userInfo.name, answer)];
                case 2:
                    result = _a.sent();
                    if (!result)
                        res.sendStatus(404);
                    if (result === "Quest??o j?? respondida!")
                        return [2 /*return*/, res.sendStatus(409)];
                    res.sendStatus(201);
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    console.log(e_4);
                    res.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.newAnswer = newAnswer;
