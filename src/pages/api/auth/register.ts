import {NextApiRequest, NextApiResponse} from "next";
import {badMethod, badRequest, ok} from "../../../helpers/api";
import {registerUser} from "../../../lib/user";
import {instanceOfUser} from "../../../types/User";

async function post(req: NextApiRequest, res: NextApiResponse) {
    if (req.body.username === undefined || req.body.email === undefined || req.body.password === undefined)
        return badRequest(req, res, {message: 'Required username, email and password field'});

    let response = await registerUser(req.body.username, req.body.email, req.body.password);

    if (instanceOfUser(response))
        return ok(req, res, {message: `user '${req.body.username}' successfully created !`, data: response});
    return badRequest(req, res, {data: response.code});
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        return (await post(req, res));
    } else {
        return badMethod(req, res, 'POST');
    }
}
