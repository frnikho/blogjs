import {NextApiRequest, NextApiResponse} from "next";
import {badMethod} from "../../../helpers/api";

function post(req: NextApiRequest, res: NextApiResponse) {

}

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        return post(req, res);
    } else {
        return badMethod(req, res, 'POST');
    }
}
