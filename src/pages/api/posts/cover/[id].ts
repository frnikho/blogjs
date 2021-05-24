import {NextApiRequest, NextApiResponse} from "next";
import {badMethod, badRequest} from "../../../../helpers/api";
import {setPostCover} from "../../../../lib/posts";
const fileUpload = require('express-fileupload');

//handler.use(fileUpload());

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        return await post(req, res);
    } else {
        return badMethod(req, res, 'POST');
    }
}

async function post(req: any, res: NextApiResponse) {
    if (req.cookies.user_id === undefined)
        return badRequest(req, res, {message: 'you need to be login !'})
    const {id} = req.query;
    const user_id = req.cookies.user_id
    let target = req.files.cover;

    let response = await setPostCover(id as string, user_id, target);
    res.status(200).json({});
}