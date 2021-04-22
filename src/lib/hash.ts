import {genSalt, hash, compare} from 'bcrypt';
const saltRounds = 10;

export async function crypt(text: string): Promise<string> {
    const salt = await genSalt(saltRounds);
    return (await hash(text, salt));
}

export async function compareText(text: string, hash: string): Promise<boolean> {
    return (await compare(text, hash));
}
