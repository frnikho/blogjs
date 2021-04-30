import {NextApiRequest, NextApiResponse} from "next";
import {badMethod, badRequest, ok} from "../../../helpers/api";
import {createComment} from "../../../lib/comment";
import {checkSessionIsRegistered} from "../../../lib/session";
import {Comment} from "../../../types/Comment";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.body.content === undefined || req.body.post_id === undefined)
        return badRequest(req, res, {message: 'fields content and post_id required !'});

    if (!await checkSessionIsRegistered(req.cookies.login_session))
        return badRequest(req, res, {message: 'user not logged !'});

    let comment: Comment = await createComment(req.body.content, req.cookies.user_id, req.body.post_id);
    if (comment == null)
        return badRequest(req, res, {message: `Internal Server Error`});
    return ok(req, res, {data: comment});

}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        return await post(req, res);
    } else {
        return badMethod(req, res, 'POST');
    }
}
