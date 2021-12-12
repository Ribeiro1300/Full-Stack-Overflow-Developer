import supertest from "supertest";
import app from "../../src/app";

describe("GET /questions", () => {
  it("Return all the unanswered questions", async () => {
    const result = await supertest(app).get("/questions");

    expect(result.status).toEqual(201);
  });
});
