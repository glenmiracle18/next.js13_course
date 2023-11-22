import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";



// Get prompts by user id
export const GET = async (request) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')
        console.log("Server response:", JSON.stringify(prompts));
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 