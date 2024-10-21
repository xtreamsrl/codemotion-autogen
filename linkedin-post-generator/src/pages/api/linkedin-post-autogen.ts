// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";

type ResponseData = {
    content: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    if (req.method === 'POST') {
        const {topic} = req.body;
        const response = await fetch(`http://autogenstudio-server:8082/predict/${topic}`)
        const content = await response.json()
        res.status(200).json({content: content.data.meta.messages.at(-2).message.content});
    } else {
        res.status(405).json({content: 'Method Not Allowed'});
    }
}
