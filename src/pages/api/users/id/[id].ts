import {NextApiRequest, NextApiResponse} from "next";
import {badMethod, badRequest, ok} from "../../../../helpers/api";
import {getUserById} from "../../../../lib/user";
import {User} from "../../../../types/User";

async function get(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const {id} = req.query;
    if (id === undefined)
        return badRequest(req, res, {message: 'Required id query !'});
    let user = await getUserById(id as string);
    if (user === null)
        return badRequest(req, res, {message: `user with id '${id as string} not found !'`});

    return ok(req, res, {data: user as User});
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return await get(req, res);
    } else {
        return badMethod(req, res, 'GET')
    }
}
