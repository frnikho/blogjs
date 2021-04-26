import {NextApiRequest, NextApiResponse} from "next";
import {badRequest, badMethod, ok} from "../../../helpers/api";
import * as userHelper from "../../../helpers/user";
import {registerUser} from "../../../lib/user";
import {instanceOfUser} from "../../../types/User";

async function post(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.body.username === undefined || req.body.email === undefined || req.body.password === undefined)
        return badRequest(req, res, {message: "Wrong request ! need username, email and password body fields !"});

    if (!userHelper.checkUsernameSyntax(req.body.username))
        return badRequest(req, res, {message: "Bad username syntax !"});
    if (!userHelper.checkPasswordIsValid(req.body.password))
        return badRequest(req, res, {message: "Bad password syntax !"});
    if (!userHelper.checkEmailIsValid(req.body.email))
        return badRequest(req, res, {message: "Bad email syntax !"});

    let response = await registerUser(req.body.username, req.body.email, req.body.password);

    if (instanceOfUser(response))
        return ok(req, res, {message: `user '${req.body.username}' successfully created !`, data: response});
    return badRequest(req, res, {data: response.code});
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        await post(req, res);
    } else {
        badMethod(req, res, 'POST');
    }
}
