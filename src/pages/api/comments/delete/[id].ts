import {NextApiRequest, NextApiResponse} from "next";
import {badMethod, badRequest, ok} from "../../../../helpers/api";
import {deleteCommentWithId} from "../../../../lib/comment";
import {checkSessionIsRegistered} from "../../../../lib/session";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
    const {id} = req.query;
    if (!req.cookies)
        return badRequest(req, res, {message: ""});
    if (!id)
        return badRequest(req, res, {message: "required post_id query"});

    if (!await checkSessionIsRegistered(req.cookies.login_session))
        return badRequest(req, res, {message: 'user not logged !'});

    let deleted: boolean = await deleteCommentWithId(id as string);
    if (deleted) {
        return ok(req, res, {message: "Deleted !"});
    } else {
        return badRequest(req, res, {message: `Cannot deleted comment '${id}'`});
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return await get(req, res);
    } else {
        return badMethod(req, res, 'GET');
    }
}
