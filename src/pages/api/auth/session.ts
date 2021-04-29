import {NextApiRequest, NextApiResponse} from "next";
import {badMethod, badRequest, ok} from "../../../helpers/api";
import {createSession, deleteSession} from "../../../lib/session";
import {Session} from "../../../types/Session";

async function post(req: NextApiRequest, res: NextApiResponse) {
    if (req.body.user_id === undefined)
        return badRequest(req, res, {message: 'post session required user_id body field !'});

    let response = await createSession(req.body.user_id);
    if (response === null) {
        return badRequest(req, res, {message: "unable to create session !"});
    }
    return ok(req, res, {data: response});
}

async function get(req: NextApiRequest, res: NextApiResponse) {
    if (req.body.cookie_session === undefined) {
        return badRequest(req, res, {message: 'Required cookie_session body !'});
    }
}

async function del(req: NextApiRequest, res: NextApiResponse) {
    if (req.cookies.login_session === undefined || req.cookies.user_id === undefined)
        return badRequest(req, res, {message: 'delete session required user_id body field and login_session cookie'});
    let s: Session = {
        id: req.cookies.login_session,
        user_id: req.cookies.user_id
    }
    if (await deleteSession(s)) {
        return ok(req, res, {message: 'login session deleted !'})
    } else {
        return badRequest(req, res, {message: 'cant delete login session !'});
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        return await post(req, res)
    } else if (req.method === 'GET') {
        return await get(req, res);
    } else if (req.method === 'DELETE') {
        return await del(req, res);
    } else {
        return badMethod(req, res, 'POST, GET OR DELETE');
    }
}
