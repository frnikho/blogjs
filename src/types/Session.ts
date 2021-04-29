export interface Session {
    id: string,
    user_id?: string
}

export function instanceOfSession(data: any): data is Session {
    return 'user_id' in data;
}
