const sum = require('../app/api/sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3);
    expect(sum(undefined, 3)).toBeUndefined();
});
