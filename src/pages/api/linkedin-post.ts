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
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: "user", content: `Generate content for topic: ${topic}`}],
        })
        const content = response.choices[0].message.content?.trim() || '';
        res.status(200).json({content});
    } else {
        res.status(405).json({content: 'Method Not Allowed'});
    }
}
