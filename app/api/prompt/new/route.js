import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export const POST = async (req, res) => { // this will hear for post requests under this route (defined by th file system)
    const {userId, prompt, tag } = await req.json();
    // The line above does this action. 
    try {
        // We need to connect to the db because this is a serverless environment
        // This is also called a lambda funciton, which means that:
        // Every time it gets called it needs to do it's job and then go in peace
        const db = await connectToDB(); // This function will connect to the db or return the connection if it's already connected
        // We need to create a new prompt object
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })
        // We need to save the prompt object
        const savedPrompt = await newPrompt.save();
        // We need to return the savedPrompt
        return new Response(JSON.stringify(savedPrompt), {
            status: 201
        })
    } catch (error) {

    }
}