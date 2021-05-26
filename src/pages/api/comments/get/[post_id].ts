import {NextApiRequest, NextApiResponse} from "next";
import {getCommentsWithPostID} from "../../../../lib/comment";
import {badMethod, badRequest, ok} from "../../../../helpers/api";
import {Comment} from "../../../../types/Comment";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
    const {post_id} = req.query;
    if (!post_id)
        return badRequest(req, res, {message: "required post_id query"})
    let comments: Comment[] = await getCommentsWithPostID(post_id as string);
    return ok(req, res, {data: comments});
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return await get(req, res);
    } else {
        return badMethod(req, res, 'GET');
    }
}
