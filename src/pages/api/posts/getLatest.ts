import {NextApiRequest, NextApiResponse} from "next";
import {badMethod, badRequest, ok} from "../../../helpers/api";
import {getLatestPost} from "../../../lib/posts";
import {Post} from "../../../types/Post";

async function get(req: NextApiRequest, res: NextApiResponse) {
    let posts: Post[] = await getLatestPost();
    return ok(req, res, {data: posts});
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return await get(req, res);
    } else {
        return badMethod(req, res, 'GET');
    }
}
