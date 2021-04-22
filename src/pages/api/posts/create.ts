import {NextApiRequest, NextApiResponse} from "next";
import {badMethod, badRequest} from "../../../helpers/api";

function post(req: NextApiRequest, res: NextApiResponse) {
    if (req.body.content === undefined || req.body.userid === undefined || req.body.title === undefined || req.body.category === undefined)
        return badRequest(req, res, {});
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        return post(req, res);
    } else {
        return badMethod(req, res, 'POST');
    }
}
