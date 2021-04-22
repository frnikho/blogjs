import {createConnection} from "./db";
import {crypt} from "./hash";

import {instanceOfQueryError, QueryError} from "./db";
import {User} from "../types/User";

export async function checkUserAvailability(field: string, value: string): Promise<boolean> {
    let con = await createConnection();
    let result = await con.query(`SELECT id FROM users WHERE ${field} = '${value}'`).catch((error) => error);
    await con.end();
    return result[0] !== undefined;
}

export async function getAllUser(): Promise<User[]> {
    let con = await createConnection();
    let response = await con.query('SELECT id, username, email, created_time FROM users');
    await con.end();
    let users: User[] = [];
    response.forEach((user) => users.push({
           id: user.id,
           username: user.username,
           email: user.email,
        }));
    return users;
}

export async function getUserByUsername(username: string) : Promise<User | QueryError> {
    let con = await createConnection();
    let result = await con.query(`SELECT id, username, email, created_time FROM users WHERE username = '${username}'`).catch((error) => error);
    await con.end();
    if (result[0] === undefined)
        return {code: "No result", errno: -1, message: `No result for user '${username}'`} as QueryError;
    return (result[0] as User);
}

export async function getUserByEmail(email: string) : Promise<User | QueryError> {
    let con = await createConnection();
    let result = await con.query(`SELECT id, username, email, created_time FROM users WHERE email = '${email}'`).catch((error) => error);
    await con.end();
    if (result[0] === undefined)
        return {code: "No result", errno: -1, message: `No result for user with email '${email}'`} as QueryError;
    return (result[0] as User);
}

export async function registerUser(username: string, email: string, password: string): Promise<User | QueryError> {
    let hash = await crypt(password);
    let con = await createConnection();
    let response = await con.query(`INSERT INTO users (username, email, password) values (?, ?, ?)`, [username, email, hash]).catch((error) => error);
    await con.end();
    if (response.affectedRows != undefined && response.affectedRows == 1)
        return (await getUserByUsername(username));
    return response;
}

export async function deleteUserByEmail(email: string) : Promise<QueryError | boolean> {
    let con = await createConnection();
    let response = await con.query(`DELETE FROM users WHERE email = '${email}';`).catch((error) => error);
    await con.end();
    if (instanceOfQueryError(response))
        return (response as QueryError);
    return response.affectedRows != 0;
}
