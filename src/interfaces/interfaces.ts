interface Id {
  id: number;
}

interface Question {
  question: string;
  student: string;
  class: string;
  tags: string;
}

interface CompleteQuestion extends Question {
  answered: boolean;
  submitAt: string;
}

interface answeredQuestion extends Question {
  answeredAt: string;
  answeredBy: string;
  answer: string;
}

interface User {
  name: string;
  class: string;
}

interface UserToken extends User {
  token: string;
}
interface Token {
  token: string;
}
export { Id, Question, answeredQuestion, User, UserToken, Token, CompleteQuestion };
