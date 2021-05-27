import {NextApiRequest, NextApiResponse} from "next";
import {badMethod, badRequest, ok} from "../../../../helpers/api";
import {deletePostWithId} from "../../../../lib/posts";
import {checkSessionIsRegistered} from "../../../../lib/session";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
    const {post_id} = req.query;
    if (!req.cookies)
        return badRequest(req, res, {message: ""});
    if (!post_id)
        return badRequest(req, res, {message: "required post_id query"});

    if (!await checkSessionIsRegistered(req.cookies.login_session))
        return badRequest(req, res, {message: "you need to be login"});

    let deleted: boolean = await deletePostWithId(post_id as string);
    if (deleted) {
        return ok(req, res, {message: "Deleted !"});
    } else {
        return badRequest(req, res, {message: `Cannot deleted post '${post_id}'`});
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return await get(req, res);
    } else {
        return badMethod(req, res, 'GET');
    }
}
