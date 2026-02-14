/**
 * AI面接 評価API（evaluate route）の結合テスト
 *
 * 対象: src/app/api/ai-interview/evaluate/route.ts
 * リクエスト受信 → バリデーション →（モック）Gemini 呼び出し → JSON パース → レスポンス の一連の流れを検証する
 *
 * 動作方法:
 *   npm test  … 全テストを実行
 *   npm test -- --testPathPattern=evaluate/route.integration  … このファイルのみ実行
 */

const mockGenerateContent = jest.fn();

jest.mock("@google/genai", () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: {
      generateContent: mockGenerateContent,
    },
  })),
}));

import { NextRequest } from "next/server";
import { POST } from "./route";

const validAiResponse = {
  score: 85,
  evaluation: {
    appropriateness: "内容は適切です。",
    logic: "論理的に説明されています。",
    specificity: "具体例が含まれています。",
    conciseness: "簡潔にまとまっています。",
  },
  feedback: "総合的に良い回答です。",
  improvements: "さらに経験の深掘りがあると良いです。",
};

function createRequest(body: object): NextRequest {
  return new NextRequest("http://localhost/api/ai-interview/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/ai-interview/evaluate（結合）", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv, GEMINI_API_KEY: "test-key" };
    mockGenerateContent.mockResolvedValue({
      text: JSON.stringify(validAiResponse),
    });
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test("question と answer を送ると 200 で評価結果が返る", async () => {
    const req = createRequest({
      question: "自己紹介をお願いします",
      answer: "エンジニアとして3年目です。",
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.evaluation).toBeDefined();
    expect(data.evaluation.score).toBe(85);
    expect(data.evaluation.evaluation).toEqual(validAiResponse.evaluation);
    expect(data.evaluation.feedback).toBe(validAiResponse.feedback);
    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
  });

  test("question がないと 400 でエラーメッセージが返る", async () => {
    const req = createRequest({ answer: "回答だけ" });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("question and answer are required");
    expect(mockGenerateContent).not.toHaveBeenCalled();
  });

  test("answer がないと 400 でエラーメッセージが返る", async () => {
    const req = createRequest({ question: "質問だけ" });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("question and answer are required");
    expect(mockGenerateContent).not.toHaveBeenCalled();
  });

  test("GEMINI_API_KEY が無いと 500 を返す", async () => {
    process.env.GEMINI_API_KEY = "";
    const req = createRequest({
      question: "Q",
      answer: "A",
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBe("GEMINI_API_KEY is missing");
    expect(mockGenerateContent).not.toHaveBeenCalled();
  });

  test("AI が ```json ... ``` 形式で返しても正しくパースされて 200 になる", async () => {
    mockGenerateContent.mockResolvedValueOnce({
      text: "```json\n" + JSON.stringify(validAiResponse) + "\n```",
    });
    const req = createRequest({
      question: "Q",
      answer: "A",
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.evaluation.score).toBe(85);
  });
});
