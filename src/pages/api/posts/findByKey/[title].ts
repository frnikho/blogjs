import {NextApiRequest, NextApiResponse} from "next";
import {badMethod, badRequest, ok} from "../../../../helpers/api";
import {findPostByKey} from "../../../../lib/posts";

async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const {title} = req.query;
    let post = await findPostByKey(title as string);
    if (post != null) {
        return ok(req, res, {data: post});
    } else {
        return badRequest(req, res, {message: "Bad title, no post with this title !"});
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return await get(req, res);
    } else {
        return badMethod(req, res, 'GET')
    }
}
