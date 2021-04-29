import {createConnection} from "./db";
import {Session} from "../types/Session";

export async function checkSessionIsRegistered(session: string) : Promise<boolean> {
    let db = await createConnection();
    let response = await db.query(`SELECT * FROM auth_sessions WHERE id = '${session}'`);

    await db.end();
    return !(response === undefined || response[0] === undefined);
}

export async function createSession(user_id: string): Promise<Session | null> {
    let db = await createConnection();
    let response = await db.query(`INSERT INTO auth_sessions (user_id) VALUES (?) RETURNING id, user_id`, user_id).catch((error) => error);

    await db.end();
    if (response !== null && response[0] !== null)
        return (response[0] as Session)
    return null;
}

export async function deleteSession(session: Session): Promise<boolean> {
    let db = await createConnection();
    let response = await db.query(`DELETE FROM auth_sessions WHERE id = '${session.id}' AND user_id = '${session.user_id}'`);

    await db.end();
    if (response.affectedRows === 1)
        return true;
    return false;
}
