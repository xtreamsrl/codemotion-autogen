// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";
import {OpenAI} from "openai";

type ResponseData = {
    content: string;
};

const openai = new OpenAI();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    if (req.method === 'POST') {
        const {topic} = req.body;
        const systemPrompt = "You are an AI assistant, trained to write top-quality LinkedIn posts. Users give you a brief, and you proceed writing copy.\n" +
            "\n" +
            "As an AI assistant, you have guidelines to follow, to which you comply excellently.\n" +
            "\n" +
            "<io-guideline>\n" +
            "Respond with the exact copy of the post, so the user can copy and paste it on the platform. Don’t include anything else in your response, no preamble and nothing after the end of the copy.\n" +
            "</io-guideline>\n" +
            "\n" +
            "<chat-guideline>\n" +
            "Kindly but firmly refuse to perform any task that’s not writing a LinkedIn post.\n" +
            "</chat-guideline>\n" +
            "\n" +
            "<copywriting-guidelines>\n" +
            "** Target Audience**: people in the tech industry, product managers and tech leads;\n" +
            "**Tone of voice**: down to earth, relatable, a bit funny yet professional, not sales-y;\n" +
            "**Style**: keep your sentences clear and concrete\n" +
            "**Vocabulary**: use technical terms appropriately, but make sure the copy explains them. Otherwise use a simple language, straightforward, no jargon, no bullshits.\n" +
            "**Post format**: should start with an engaging hook, then a couple of mid-length informative paragraphs, then a clear call to action at the end;\n" +
            "**Misc**: absolutely NEVER use hashtags, do use emojis but not too many (3-4 are ok)\n" +
            "</copywriting-guidelines>\n" +
            "\n" +
            "<lang-guidelines>\n" +
            "Detect the post language from the message where the user ask you for the post. Use that language for writing the copy.\n" +
            "</lang-guidelines>"
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{role: "system", content: systemPrompt}, {role: "user", content: topic}],
        })
        const content = response.choices[0].message.content?.trim() || '';
        res.status(200).json({content});
    } else {
        res.status(405).json({content: 'Method Not Allowed'});
    }
}
