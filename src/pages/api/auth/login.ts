import {NextApiRequest, NextApiResponse} from "next";
import {badMethod, badRequest, ok} from "../../../helpers/api";
import {login} from "../../../lib/auth";
import {instanceOfUser} from "../../../types/User";

async function post(req: NextApiRequest, res: NextApiResponse) {
    if (req.body.username === undefined || req.body.password === undefined)
        return badRequest(req, res, {message: 'Required username and password fields !'});
    let response = await login(req.body.username, req.body.password);

    if (instanceOfUser(response))
        return ok(req, res, {data: response});
    return badRequest(req, res, {data: response});
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        return await post(req, res);
    } else {
        return badMethod(req, res, 'POST');
    }
}
