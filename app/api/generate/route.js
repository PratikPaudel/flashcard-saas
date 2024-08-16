
// const systemPrompt = `You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines to create the flashcards:
// 1. Create clear and concise questions for the front of the flashcards.
// 2. Provide accurate and informative answers for the back of the flashcards.
// 3. Use simple language and make the flashcards accessible to wide range of learners.
// 4. Include a variety of question types, such as definitions, examples, comparision and applications.
// 5. When appropriate, use mnemonics, or memory aids, to help the reader remember the information.
// 6. Tailor the difficulty of the flashcards to the user's specified preferences.
// 7. If given a body of text, extract the key points and create flashcards based on them.
// 8. Aim to create a balance set of flashcards that cover all the key points of the topic.
// 9. Ensure that each flashcard focuses on a single concept or idea.
// 10. Avoid overly complex or ambiguous questions and answers.
// 11. Only generate 10 flashcards.
//
// Remember, the goal is to facilitate effective learning and retention of information through these flashcards. Good luck!
//
// Return in the following JSON format:
// {
//     "flashcards": [{
//     "front": str, 
//     "back": str
//     }]
// }
// `
// export async function POST(req) {
//     const openai = new OpenAI(process.env.OPENAI_API_KEY);
//     const data = await req.json(); // Correct method to parse request body
//
//     const completion = await openai.completions.create({
//         messages: [
//             {
//                 role: "system",
//                 content: systemPrompt
//             },
//             {
//                 role: "user",
//                 content: data
//             },
//         ],
//         model: 'gpt-3.5',
//         response_format: {type: 'json_object'},
//     });
//
//     let flashcards;
//     try {
//         flashcards = JSON.parse(completion.choices[0].message.content);
//     } catch (error) {
//         return NextResponse.json({ error: "Invalid JSON response from OpenAI" }, { status: 500 });
//     }
//     return NextResponse.json(flashcards.flashcards);
// }

import { NextResponse } from "next/server";
const Groq = require('groq-sdk');

const systemPrompt = `You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines to create the flashcards:
1. Create clear and concise questions for the front of the flashcards.
2. Provide accurate and informative answers for the back of the flashcards.
3. Use simple language and make the flashcards accessible to wide range of learners.
4. Include a variety of question types, such as definitions, examples, comparision and applications.
5. When appropriate, use mnemonics, or memory aids, to help the reader remember the information.
6. Tailor the difficulty of the flashcards to the user's specified preferences.
7. If given a body of text, extract the key points and create flashcards based on them.
8. Aim to create a balance set of flashcards that cover all the key points of the topic.
9. Ensure that each flashcard focuses on a single concept or idea.
10. Avoid overly complex or ambiguous questions and answers.
11. Only generate 10 flashcards.

Remember, the goal is to facilitate effective learning and retention of information through these flashcards. Good luck!

Return in the following JSON format:
{
    "flashcards": [{
    "front": str,
    "back": str
    }]
}
`;

export async function POST(req) {
    const client = new Groq(process.env.Groq_API_KEY);
    const data = await req.json(); // Correct method to parse request body

    console.log("Request data:", data);

    const completion = await client.chat.completions.create({
        model: "llama3-8b-8192",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: data
            }
        ],
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
    });

    console.log("Completion response:", completion);

    let flashcards;
    try {
        flashcards = JSON.parse(completion.choices[0].message.content);
    } catch (error) {
        console.error("JSON parsing error:", error);
        return NextResponse.json({ error: "Invalid JSON response from Groq" }, { status: 500 });
    }
    return NextResponse.json(flashcards.flashcards);
}