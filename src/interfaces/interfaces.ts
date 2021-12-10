interface Id {
  id: number;
}

interface Question {
  question: string;
  student: string;
  class: string;
  tags: string;
  answered: boolean;
  submitAt: string;
}

interface answeredQuestion extends Question {
  answeredAt: string;
  answeredBy: string;
  answer: string;
}

export { Id, Question, answeredQuestion };
