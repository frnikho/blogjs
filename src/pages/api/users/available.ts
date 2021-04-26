import type {NextApiRequest, NextApiResponse} from "next";
import {badMethod} from '../../../helpers/api';
import {checkUserAvailability} from "../../../lib/user";

async function post(req: NextApiRequest, res: NextApiResponse) {
    if (req.body.email === undefined && req.body.username === undefined)
        return res.status(400).json({code: 400, message: "Bad request body! required email or username field !"});
    let exists: boolean;
    if (req.body.email === undefined) {
        exists = await checkUserAvailability('username', req.body.username);
    } else {
        exists = await checkUserAvailability('email', req.body.email);
    }
    res.status(200).json({code: 200, available: !exists, withValue: req.body.email || req.body.username});
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        return post(req, res);
    } else {
        return badMethod(req, res, 'POST');
    }
}
