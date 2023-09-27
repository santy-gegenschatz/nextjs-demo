import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req, {params}) => {
    try {
        await connectToDB();
        // Find the prompt by the specific author
        const prompts = await Prompt.find({
            creator: params.id
        }).populate("creator")
        // console.log('Prompts:', prompts)
        // Return the prompt
        return new Response(JSON.stringify(prompts), {status: 200})

    } catch (error) {
        console.log(error);
        return new Response (error, {status: 500})
    }
}