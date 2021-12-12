import * as questionsRepository from "../../src/repositories/questionRepository";
import * as questionsService from "../../src/services/questionsService";

describe("Testing function answer", () => {
  const mockQuestionCheck = jest.spyOn(questionsRepository, "answer");
  const mockId = 1;
  const mockUserId = 1;
  const mockUserName = "José";
  const mockAnswer = "42";
  it("Should return null for invalid resquest", async () => {
    mockQuestionCheck.mockImplementationOnce(async () => null);
    const result = await questionsService.answer(mockId, mockUserId, mockUserName, mockAnswer);
    expect(result).toBeNull();
  });
  it("Should return 'Questão já respondida!' for question that is already answered", async () => {
    mockQuestionCheck.mockImplementationOnce(async () => "Questão já respondida!");
    const result = await questionsService.answer(mockId, mockUserId, mockUserName, mockAnswer);
    expect(result).toEqual("Questão já respondida!");
  });
  it("Should return the requested questions for invalid resquest and unanswered question", async () => {
    mockQuestionCheck.mockImplementationOnce(async () => [{ response: "Questão respondida com sucesso!" }]);
    const result = await questionsService.answer(mockId, mockUserId, mockUserName, mockAnswer);
    expect(result).not.toBeNull();
  });
});
