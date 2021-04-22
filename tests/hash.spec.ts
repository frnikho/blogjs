import * as hash from '../src/lib/hash';

describe('Crypt a text/password', () => {
   test('hash a normal string and compare it', async () => {
       const text = "Hello World";
       let passwordHashed = await hash.crypt(text);
       let compare = await hash.compareText(text, passwordHashed);
       expect(compare).toBe(true);

   });
});
