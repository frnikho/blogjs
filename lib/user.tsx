import * as db from "./db";
import {use} from "ast-types";

export interface User {
    id: string,
    username: string,
    email: string,
    password?: string,
    created_time?: Date
}

export async function getAllUser(): Promise<User[]> {
    console.log(process.env.DB_PORT);
    let con = await db.createConnection({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        db: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    });

    let response = await con.query('SELECT id, username, email, created_time FROM users');
    let users: User[] = [];
    response.forEach((user) => users.push({
           id: user.id,
           username: user.username,
           email: user.email,
        }));
    return users;
}

export function createUser(username: string, email: string, password: string) {
    console.log(process.env.DB_PORT);
}

export function deleteUserByEmail(email: string) {

}

export function deleteUserByUsername(username: string) {

}

export function getUserByUsername(username: string, password: string) {

}

export function getUserByEmail(email: string, password: string) {

}
