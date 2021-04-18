import * as db from "./db";
import * as crypt from './hash';
import {instanceOfQueryError, QueryError} from "./db";

export interface User {
    id: string,
    username: string,
    email: string,
    password?: string,
    created_time?: Date
}

export function instanceOfUser(data: any): data is User {
    return 'username' in data;
}

export async function getAllUser(): Promise<User[]> {
    let con = await db.createConnection();
    let response = await con.query('SELECT id, username, email, created_time FROM users');
    let users: User[] = [];
    response.forEach((user) => users.push({
           id: user.id,
           username: user.username,
           email: user.email,
        }));
    await con.end();
    return users;
}

export async function getUserByUsername(username: string) : Promise<User | QueryError> {
    let con = await db.createConnection();
    let result = await con.query(`SELECT id, username, email, created_time FROM users WHERE username = '${username}'`).catch((error) => {
        return error;
    })
    if (result[0] === undefined)
        return {code: "No result", errno: -1, message: `No result for user '${username}'`} as QueryError;
    return (result[0] as User);
}

export async function getUserByEmail(email: string) : Promise<User | QueryError> {
    let con = await db.createConnection();
    let result = await con.query(`SELECT id, username, email, created_time FROM users WHERE email = '${email}'`).catch((error) => {
       return error;
    });
    if (result[0] === undefined)
        return {code: "No result", errno: -1, message: `No result for user with email '${email}'`} as QueryError;
    return (result[0] as User);
}

export async function registerUser(username: string, email: string, password: string): Promise<User | QueryError> {
    let hash = await crypt.crypt(password);
    let con = await db.createConnection();
    let response = await con.query(`INSERT INTO users (username, email, password) values (?, ?, ?)`, [username, email, hash]).catch((error) => error);
    await con.end();
    if (response.affectedRows != undefined && response.affectedRows == 1)
        return (await getUserByUsername(username));
    return response;
}

export async function deleteUserByEmail(email: string) : Promise<QueryError | boolean> {
    let con = await db.createConnection();
    let response = await con.query(`DELETE FROM users WHERE email = '${email}';`).catch((error) => error);
    await con.end();
    if (instanceOfQueryError(response))
        return (response as QueryError);
    return response.affectedRows != 0;

}

export function deleteUserByUsername(username: string) {

}
