import {NextApiRequest, NextApiResponse} from "next";
import {badMethod, badRequest, ok} from "../../../helpers/api";
import {getUserByEmail, getUserByUsername} from "../../../lib/user";
import {instanceOfUser} from "../../../types/User";

async function post(req: NextApiRequest, res: NextApiResponse) {
    if (req.body.email === undefined && req.body.username === undefined)
        return badRequest(req, res, {message: 'Missing email or username field'});

    let response;
    if (req.body.email != undefined)
        response = await getUserByEmail(req.body.email);
    else
        response = await getUserByUsername(req.body.username);
    if (instanceOfUser(response))
        return ok(req, res, {data: response});
    return ok(req, res, {message: 'user not found !', data: response});
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        await post(req, res);
    } else {
        badMethod(req, res, 'POST');
    }
}
