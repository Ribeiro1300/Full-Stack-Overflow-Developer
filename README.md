# Full-Stack-Overflow-Developer

An API to record questions e answers freely. Each questions can only have one answer or none if it's recent created.

## Install

    npm install

## Run the app

    npm run dev

## Run the tests

    npm test

## Resquests

| ROUTES               | Description                                |
| -------------------- | ------------------------------------------ |
| `GET/questions`      | Returns all unanswered questions.          |
| `POST/questions`     | Adds a new question and returns it's id.   |
| `GET/questions/:id`  | Returns a question searched by the id..    |
| `POST/questions/:id` | Answers a question using the id.           |
| `POST/users`         | Creates a new user and returns it's token. |

## Get all unanswered questions.

### Request

`GET /questions`

### Response

    [
        {
        "id": 1,
        "question": "Posso ir ao banheiro?",
        "student": "José",
        "class": "T3",
        "submitAt": "2021-12-10 19:18"
        },
        {
        "id": 2,
        "question": "É pra copiar?",
        "student": "Joãozinho",
        "class": "T3",
        "submitAt": "2021-12-10 19:18"
        }
    ]

## Post a new question

### Request

`POST /questions`

    {
        "question": "Posso ir ao banheiro?",
        "student": "José",
        "class": "T3",
        "tags": "healthlife,madlad"
    }

### Response

    {
        "id": 1
    }

## Get an especific question by it's id.

### Request

`GET /questions/:id`

### Response

    {
        "question": "Posso ir ao banheiro?",
        "student": "José",
        "class": "T3",
        "tags": "healthlife,madlad",
        "answered": false,
    }

or

    {
        "question": "É pra copiar?",
        "student": "Joãozinho",
        "class": "T3",
        "tags": "dumbQuestions",
        "answered": true,
        "submitAt": "2021-12-10 19:13",
        "answeredAt": "2021-12-11 14:25",
        "answeredBy": "Professor",
        "answer": "Óbvio!"
    }

## Post an answer to a question using the question's id.

### Request

`POST /questions/:id`

- Headers

        Authorization: Bearer [access_token]

- Body

        {
          "answer": "42"
        }

### Responses

- Response 201: Answer submited successfully.
- Response 404: Couldn't find the question.
- Response 409: Question already answered.

## Post a new user.

### Request

`POST /users`

    {
        "name": "Maria",
        "class": "T3"
    }

### Response

    {
        "token": "123456"
    }
