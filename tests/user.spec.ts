import * as user from '../src/lib/user'
import {instanceOfUser, User} from "../src/lib/user";
import {instanceOfQueryError, QueryError} from "../src/lib/db";

describe('Create, get and remove user from database', () => {
    require('dotenv').config();

    test('Get all users', async () => {
       let users = await user.getAllUser();
       expect(users.length).toBeGreaterThan(0);
       expect(users[0].password).toBeUndefined();
    });

    test('Get User by username', async () => {
       let result: User | QueryError = await user.getUserByUsername("Nikho");
       expect(instanceOfUser(result)).toBe(true);
       expect((result as User).username).toBe("Nikho");
    });

    test('Get User by email', async () => {
        let result = await user.getUserByEmail("nicolas.sansd@gmail.com");
        expect(instanceOfUser(result)).toBe(true);
    });

    test('Try to get a wrong username', async () => {
       let result: QueryError | User = await user.getUserByUsername('OhNo');
       expect(instanceOfUser(result)).toBe(false);
       expect(instanceOfQueryError(result)).toBe(true);
       expect((result as QueryError).errno).toBe(-1);
    });

    test('Try to get a user with a wrong email', async () => {
        let result: QueryError | User = await user.getUserByEmail('OhNo@no');
        expect(instanceOfUser(result)).toBe(false);
        expect(instanceOfQueryError(result)).toBe(true);
        expect((result as QueryError).errno).toBe(-1);
    });

    test('Create user', async () => {
       let result = await user.registerUser("UserTest", "exampletesttest@test.fr", "AwesomePassword:)");
       expect((result as User).username).toBe("UserTest");

       result = await user.registerUser("UserTest", "exampletesttest@test.fr", "AwesomePassword:)");
       expect(instanceOfQueryError(result)).toBe(true);

       let response = await user.deleteUserByEmail("exampletesttest@test.fr");
       expect(response).toBe(true);
    });

    test('delete wrong user', async () => {
        let response = await user.deleteUserByEmail("CompletelyWrongUserEmails");
        expect(response).toBe(false);
    });

    test('test sql injection', async () => {
        let r1 = await user.deleteUserByEmail("Gifts'--");
        expect(instanceOfQueryError(r1)).toBe(true);

        let r2 = await user.getUserByEmail("Gifts'--");
        expect(instanceOfQueryError(r2)).toBe(true);

        let r3 = await user.getUserByUsername("Gifts'--");
        expect(instanceOfQueryError(r3)).toBe(true);
    });

});
