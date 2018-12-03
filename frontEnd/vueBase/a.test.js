import a from './src/utils/a'


test('adds 1 + 2 to equal a', () => {
    expect(a(1, 2)).toEqual({
        a: 1,
        b: 2
    });
});