import {NextApiRequest, NextApiResponse} from "next";
import {badMethod, ok} from "../../../helpers/api";
import {getComments} from "../../../lib/comment";
import {Comment} from "../../../types/Comment";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
    let comments: Comment[] = await getComments();
    return ok(req, res, {data: comments});
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return await get(req, res);
    } else {
        return badMethod(req, res, 'GET');
    }
}
