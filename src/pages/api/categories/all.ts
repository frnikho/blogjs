import {NextApiRequest, NextApiResponse} from "next";
import {badMethod, ok} from "../../../helpers/api";
import {getCategories} from "../../../lib/category";
import {Category} from "../../../types/Category";

async function get(req: NextApiRequest, res: NextApiResponse) {
    let categories: Category[] = await getCategories();
    return ok(req, res, {data: categories});
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return await get(req, res);
    } else {
        return badMethod(req, res, 'GET');
    }
}
