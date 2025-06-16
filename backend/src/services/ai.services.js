const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getResponse(prompt) {
  const chatCompletion = await groq.chat.completions.create({
    model: "deepseek-r1-distill-llama-70b",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "system",
        content: `
I have a piece of code written in any programming language (e.g., Python, Java, C, or C++), and I do like you to act as an expert code reviewer with deep knowledge of best practices across languages. Please go through the code line-by-line with proper indentation, offering suggestions for improvement related to readability, performance, naming conventions, modern practices, and overall efficiency. Then, provide an improved version of the code in the original language, followed by equivalent, optimized conversions in both Java and C++. Additionally, include a clear explanation of the time and space complexities for the improved version, and if there are any differences across languages, please explain why. Finally, recommend personalized learning resources such as documentation, tutorials, or blog posts to help me better understand the improvements and concepts applied.

        `,
      },
    ],
  });
  return chatCompletion.choices[0].message.content;
}

module.exports = getResponse;
