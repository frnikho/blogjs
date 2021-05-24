import {instanceOfPost, Post} from '../types/Post';
import {createConnection} from "./db";
import path from "path";
import {v4 as uuidv4} from 'uuid';

export async function getLatestPost(): Promise<Post[]> {
    let posts: Post[] = [];
    let db = await createConnection();
    let response = await db.query(`SELECT * FROM posts ORDER BY created_date LIMIT 20;`);
    response.map((value) => {
       posts.push(value as Post);
    });
    return posts;
}

export async function findPostByKey(key: string): Promise<Post | null> {
    let db = await createConnection();
    let response = await db.query(`SELECT * FROM posts WHERE url_key = '${key}'`);
    if (response[0] != null && instanceOfPost(response[0])) {
        return (response[0] as Post);
    } else {
        return null;
    }
}

export async function checkIfUrlKeyIsAvailable(key: string): Promise<boolean> {
    if (key === "")
        return false;
    let db = await createConnection();
    let response = await db.query(`SELECT id FROM posts WHERE url_key = '${key}'`);

    await db.end();
    if (response === undefined || response[0] === undefined) {
        return true;
    } else {
        return false;
    }
}

export async function createPost(post: Post): Promise<Post | null> {
    let db = await createConnection();
    let response = await db.query(`INSERT INTO posts (user_id, category_id, title, content, url_key) VALUES (?, ?, ?, ?, ?) RETURNING *`,  [post.userId, post.categoryId, post.title, post.content, post.url_key]);
    console.log(response);
    if (response === undefined || response[0] === undefined)
        return null;
    return response[0] as Post;
}

export async function getAllPostFromUser(user_id: string): Promise<Post[]> {
    let posts: Post[] = [];
    let db = await createConnection();
    let response = await db.query(`SELECT * FROM posts WHERE user_id = '${user_id}' ORDER BY created_date`);
    await db.end();
    response.map((post) => {
        posts.push(post as Post);
    });
    return posts;
}


export async function setPostCover(post_id: string, user_id: string, target: any): Promise<Boolean> {
    let filePath = "/" + uuidv4();
    let serverPath = path.join(process.cwd(), 'public', filePath);
    let db = await createConnection();
    let response = await db.query(`UPDATE posts SET image_cover_url = '${filePath}' WHERE id = '${post_id}'`);
    await db.end();
    let responseFile = await target.mv(serverPath);
    return false;
}