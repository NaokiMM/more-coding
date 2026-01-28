import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { question, answer } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "question and answer are required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // プロンプトを作成
    const prompt = `あなたはAI面接の評価者です。以下の面接問題に対する回答を評価し、フィードバックを提供してください。

【面接問題】
${question}

【回答者の回答】
${answer}

【評価の観点】
1. 内容の適切性：問題に対して適切に答えられているか
2. 論理性：回答が論理的で分かりやすいか
3. 具体性：具体例や経験が含まれているか
4. 簡潔性：簡潔に要点を伝えられているか
5. 改善点：より良い回答のためのアドバイス

【出力形式】
以下のJSON形式で評価結果を返してください：
{
  "score": 100点満点での点数（数値）,
  "evaluation": {
    "appropriateness": "内容の適切性についての評価（100文字程度）",
    "logic": "論理性についての評価（100文字程度）",
    "specificity": "具体性についての評価（100文字程度）",
    "conciseness": "簡潔性についての評価（100文字程度）"
  },
  "feedback": "総合的なフィードバック（200文字程度）",
  "improvements": "改善点やアドバイス（200文字程度）"
}

JSON形式のみを返してください。`;

    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const responseText = res.text.trim();
    
    // JSONを抽出（```json で囲まれている場合がある）
    let jsonText = responseText;
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    } else {
      // ``` で囲まれている場合
      const codeMatch = responseText.match(/```\s*([\s\S]*?)\s*```/);
      if (codeMatch) {
        jsonText = codeMatch[1];
      }
    }

    // JSONパースを試行
    let evaluationResult;
    try {
      evaluationResult = JSON.parse(jsonText);
    } catch (parseError) {
      // JSONパースに失敗した場合、レスポンス全体をテキストとして扱う
      console.error("Failed to parse JSON response:", parseError);
      console.error("Response text:", responseText);
      // フォールバック: シンプルな評価結果を返す
      evaluationResult = {
        score: 0,
        evaluation: {
          appropriateness: "評価の生成に失敗しました。",
          logic: "評価の生成に失敗しました。",
          specificity: "評価の生成に失敗しました。",
          conciseness: "評価の生成に失敗しました。",
        },
        feedback: "申し訳ございませんが、評価の生成中にエラーが発生しました。もう一度お試しください。",
        improvements: "",
      };
    }

    return NextResponse.json({
      success: true,
      evaluation: evaluationResult,
    });
  } catch (error) {
    console.error("Error evaluating answer:", error);
    return NextResponse.json(
      {
        error: "Failed to evaluate answer",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
