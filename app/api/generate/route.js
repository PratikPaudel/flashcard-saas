import {NextResponse} from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a flashcard creator. You are tasked with creating flashcards for a new topic. The topic is "The Basics of JavaScript". You need to create 10 flashcards for this topic. The flashcards should be clear, concise, and easy to understand. The flashcards should cover the basics of JavaScript, including variables, data types, functions, and loops. The flashcards should be suitable for beginners who are new to JavaScript. The flashcards should be informative and engaging. The flashcards should help the reader learn the basics of JavaScript in a fun and interactive way.
Return in the following JSON format:
{
    "flashcards": [{
    "front": str, 
    "back": str
    }]
}
`
export async function POST(req) {
    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    const data = await req.test()

    const completion = await openai.complete.create({
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: data
            },],
        model: 'gpt-4o',
        response_format: {type: 'json_object'},
    })
    const flashcards = JSON.parse(completion.choices[0].message.content)
    return NextResponse.json(flashcards.flashcard)
}