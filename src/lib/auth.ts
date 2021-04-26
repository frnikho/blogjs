import {User} from "../types/User";
import {createConnection} from "./db";
import {compareText} from "./hash";

export async function login(username: string, password: string): Promise<User | null> {
    let db = await createConnection();
    let passwordResponse = await db.query(`SELECT password FROM users WHERE username = '${username}'`);

    if (passwordResponse[0] === undefined)
        return null;

    let passIsGood: boolean = await compareText(password, passwordResponse[0].password as string);
    console.log(passIsGood);

}
