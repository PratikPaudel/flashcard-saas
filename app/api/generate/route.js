import { NextResponse } from "next/server";
const Groq = require('groq-sdk');

const systemPrompt = `You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines to create the flashcards:
1. Create clear and concise questions for the front of the flashcards.
2. Provide accurate and informative answers for the back of the flashcards.
3. Use simple language and make the flashcards accessible to wide range of learners.
4. Include a variety of question types, such as definitions, examples, comparisons, and applications.
5. When appropriate, use mnemonics, or memory aids, to help the reader remember the information.
6. Tailor the difficulty of the flashcards to the user's specified preferences.
7. If given a body of text, extract the key points and create flashcards based on them.
8. Aim to create a balanced set of flashcards that cover all the key points of the topic.
9. Ensure that each flashcard focuses on a single concept or idea.
10. Avoid overly complex or ambiguous questions and answers.
11. Only generate 9 flashcards.

Remember, the goal is to facilitate effective learning and retention of information through these flashcards. Good luck!

Return in the following JSON format:
{
    "flashcards": [{
    "front": str,
    "back": str
    }]
}
`;

const pdfSystemPrompt = `You are tasked with creating educational flashcards from the text of a PDF. 
   Your goal is to extract important concepts, terms, or questions from the PDF text and generate flashcards. 
   
   The flashcards should follow this structure:
   - "front": The term, concept, or question that tests knowledge from the PDF text.
   - "back": The detailed explanation or definition relevant to the question.
Only generate 9 flashcards.
  Return in the following JSON format:
{
    "flashcards": [{
    "front": str,
    "back": str
    }]
}
   
   Ensure the questions are clear, concise, and relevant to the content of the provided PDF text.
   `;

const imageSystemPrompt = `You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given image content. Follow these guidelines to create the flashcards:
1. Extract key points and essential information from the image.
2. Create clear and concise questions for the front of the flashcards.
3. Provide accurate and informative answers for the back of the flashcards.
4. Use simple language and make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. When appropriate, use mnemonics or memory aids to help the reader remember the information.
7. Tailor the difficulty of the flashcards to the user's specified preferences.
8. Aim to create a balanced set of flashcards that cover all the key points of the content.
9. Ensure that each flashcard focuses on a single concept or idea.
10. Avoid overly complex or ambiguous questions and answers.
11. Only generate 9 flashcards.

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
    const client = new Groq(process.env.GROQ_API_KEY);

    // Extract content and contentType from the request body
    let content, contentType;
    try {
        const body = await req.json();
        content = body.content;
        contentType = body.contentType;

        if (typeof content !== 'string' || typeof contentType !== 'string') {
            return NextResponse.json({ error: "Content and contentType must be strings" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error extracting content from request:", error);
        return NextResponse.json({ error: "Failed to parse request body" }, { status: 400 });
    }

    // Choose the appropriate system prompt based on content type
    let selectedSystemPrompt;
    if (contentType === 'pdf') {
        selectedSystemPrompt = pdfSystemPrompt;
    } else if (contentType === 'image') {
        selectedSystemPrompt = imageSystemPrompt;
    } else {
        selectedSystemPrompt = systemPrompt;
    }

    // Fetch completion from Groq SDK
    let completion;
    try {
        completion = await client.chat.completions.create({
            model: "llama3-8b-8192",
            messages: [
                {
                    role: "system",
                    content: selectedSystemPrompt
                },
                {
                    role: "user",
                    content: content
                }
            ],
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null
        });

        // Log the response from Groq SDK
        console.log("Groq SDK response:", completion);

    } catch (error) {
        console.error("Error with Groq SDK request:", error);
        return NextResponse.json({ error: "Failed to get completion from Groq SDK" }, { status: 500 });
    }

    // Validate and parse the response
    let flashcards;
    try {
        const responseContent = completion.choices[0]?.message?.content;

        if (!responseContent) {
            throw new Error("No message content found in the response.");
        }

        // Extract the JSON part from the response using a regular expression
        const jsonResponse = responseContent.match(/\{[\s\S]*\}/);

        if (!jsonResponse) {
            throw new Error("No valid JSON found in the response.");
        }

        // Parse the extracted JSON
        flashcards = JSON.parse(jsonResponse[0]);
    } catch (error) {
        console.error("JSON parsing error:", error);
        return NextResponse.json({ error: "Invalid or incomplete JSON response from Groq" }, { status: 500 });
    }

    return NextResponse.json(flashcards.flashcards);
}