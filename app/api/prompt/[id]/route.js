// The necessary imports
import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

// The GET ROUTE
export const GET = async (req, {params}) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) {
            return new Response('Prompt not found', {
                status: 404
            });
        }
        return new Response(JSON.stringify(prompt), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch', {
            status: 500
        });
    }
}

// The PATCH ROUTE
export const PATCH = async (req, {params}) => {
    const { prompt, tag } = await req.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) {
            return new Response('Prompt not found', {
                status: 404
            });
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response('Failed to update', {
            status: 500
        });
    }
}

export const DELETE = async (req, {params}) => {
    try {
        await connectToDB();
        const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

        if (!deletedPrompt) {
            return new Response('Prompt not found', {
                status: 404
            });
        }

        return new Response(JSON.stringify(deletedPrompt), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response('Failed to delete', {
            status: 500
        });
    }
}

