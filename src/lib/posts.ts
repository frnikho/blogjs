import {Post} from '../types/Post';
import {createConnection} from "./db";

export async function getLatestPost(): Promise<Post[]> {
    let posts: Post[] = [];
    let db = await createConnection();
    let response = await db.query(`SELECT * FROM posts ORDER BY created_date LIMIT 20;`);
    response.map((value) => {
       posts.push(value as Post);
    });
    return posts;
}
