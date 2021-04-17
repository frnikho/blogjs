const mariadb = require('mariadb');

export function createConnection({host, user, password, port, db})  {
    return mariadb.createConnection({host: host, user: user, password: password, port: port, database: db});
}
