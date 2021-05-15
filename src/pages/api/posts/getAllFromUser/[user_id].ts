import {NextApiRequest, NextApiResponse} from "next";
import {badMethod, ok} from "../../../../helpers/api";
import {getAllPostFromUser} from "../../../../lib/posts";

async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const {user_id} = req.query;
    let posts = await getAllPostFromUser(user_id as string);
    return ok(req, res, {data: posts});
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return await get(req, res);
    } else {
        return badMethod(req, res, 'GET')
    }
}
