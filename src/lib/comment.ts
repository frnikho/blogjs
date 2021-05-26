import {Comment} from "../types/Comment";
import {createConnection} from "./db";

export const createComment = async (content: string, user_id: string, post_id: string) : Promise<Comment | null> => {
    let db = await createConnection();
    let response = await db.query(`INSERT INTO comments (content, user_id, post_id) VALUES (?, ?, ?) RETURNING *`, [content, user_id, post_id]);

    await db.end();
    if (response === undefined || response[0] === undefined)
        return null;
    return (response[0] as Comment);
}

export const getComments = async (): Promise<Comment[]> => {
    let comments: Comment[] = [];
    let db = await createConnection();
    let response = await db.query(`SELECT * FROM comments ORDER BY created_date`);

    await db.end();

    response.map((value) => {
        comments.push(value as Comment);
    });

    return comments.reverse();
}

export const getCommentsWithPostID = async (post_id: string): Promise<Comment[]> => {
    let comments: Comment[] = [];
    let db = await createConnection();
    let response = await db.query(`SELECT * FROM comments WHERE post_id = '${post_id}' ORDER BY created_date`);

    await db.end();

    response.map((value) => {
        comments.push(value as Comment);
    });

    return comments.reverse();
}
