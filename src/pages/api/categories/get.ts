import {NextApiRequest, NextApiResponse} from "next";
import {badMethod} from "../../../helpers/api";

function get(req: NextApiRequest, res: NextApiResponse) {

}

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return get(req, res);
    } else {
        return badMethod(req, res, 'GET');
    }
}
