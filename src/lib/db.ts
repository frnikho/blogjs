const mariadb = require('mariadb');

export interface QueryError {
    message: string,
    code: string,
    errno: number
}

export function instanceOfQueryError(data: any): data is QueryError {
    return 'code' in data;
}

export function createConnection()  {
    return mariadb.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
    });
}
