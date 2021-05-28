import {NextApiRequest, NextApiResponse} from "next";
import {badMethod, badRequest, ok} from "../../../helpers/api";
import {createPostUrlKey} from "../../../helpers/post";
import {checkIfUrlKeyIsAvailable, createPost} from "../../../lib/posts";
import {checkSessionIsRegistered} from "../../../lib/session";

async function post(req: NextApiRequest, res: NextApiResponse) {
    if (req.body.content === undefined || req.body.title === undefined || req.body.category === undefined)
        return badRequest(req, res, {message: 'Fields content, title and category required !'});
    if (req.cookies.user_id === undefined || req.cookies.login_session === undefined)
        return badRequest(req, res, {message: 'user not logged !'});

    if (!await checkSessionIsRegistered(req.cookies.login_session))
        return badRequest(req, res, {message: 'Invalid user session, clear your cookie and try again'});

    if (req.body.content.length < 50 && req.body.content > 25565)
        return badRequest(req, res, {message: "too long or too short content ! (> 50 && < 25565)"});
    if (req.body.title.length < 5 && req.body.title > 200)
        return badRequest(req, res, {message: "too long or too short title ! (> 5 && < 200)"});

    let key = createPostUrlKey(req.body.title);
    let canContinue = await checkIfUrlKeyIsAvailable(key);
    if (!canContinue)
        return badRequest(req, res, {message: `can't create url key with this title ! try a other one`});

    let post = await createPost({
        user_id: req.cookies.user_id,
        title: req.body.title,
        url_key: key,
        categoryId: req.body.category,
        content: req.body.content,
        id: '?'
    });

    if (post === null) {
        return badRequest(req, res, {message: 'An error occurred, try again later !'});
    } else {
        return ok(req, res, {data: post});
    }

}

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        return post(req, res);
    } else {
        return badMethod(req, res, 'POST');
    }
}
