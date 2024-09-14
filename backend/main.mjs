/*
    flow:
    gets http request with ID and prompt
    runs npcInterface() with said ID and prompt
    Adds prompt & response to 
    Evaluates the prompts and returns the results
*/

import OpenAI from "openai";
import express from "express";
import { npcs, evalPrompt } from "./npcs.mjs";
import multer from "multer";
import fs from "fs";

const app = express();
const port = 3000;
const openai = new OpenAI();

app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Specify the directory to save the uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    },
});
const upload = multer({ storage: storage });

let conversations = []; // Assuming conversations is a global object

async function updateConvo(convo, message) {
    // Add new prompt, sends it over, gets response and adds it to the array. Returns the response
    convo.push({ role: "user", content: message });
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: convo,
    });
    const assistantMessage = completion.choices[0].message; // get the message of the first choice

    // Add assistant's response to the convo array
    convo.push({ role: "assistant", content: assistantMessage.content });

    return assistantMessage.content;
}

app.post("/npcresponse", upload.single("audio"), async (req, res) => {
    const { id } = req.body;
    const file = req.file;

    if (!file || !id) {
        return res.status(400).json({ error: "Missing File or ID" });
    }

    const filePath = `uploads/${file.originalname}`;
    fs.renameSync(file.path, filePath);

    const message = await transcribeAudio(file);

    let prompt = npcs[id].prompt;
    console.log("prompt:" + prompt);

    let convo = conversations[id] || []; // get any previous messages or initialize a new array
    convo.push({ role: "system", content: prompt });
    const response = await updateConvo(convo, message); // updates conversation
    conversations[id] = convo;

    // console.log(response); // debug

    const result = await evaluateResponse(response);
    res.json({ team: result.content, response: response });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

async function evaluateResponse(message) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [evalPrompt, { role: "user", content: message }], // should be correct datatype, but plz flag
    });
    return completion.choices[0].message;
}

async function transcribeAudio(file) {
    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(file.path),
        model: "whisper-1",
    });
    console.log("transcript:" + transcription.text);
    return transcription.text;
}
