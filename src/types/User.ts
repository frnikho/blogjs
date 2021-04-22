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
