import { ap,ap2, aPromise} from '../src/utils/url'

test('ap is ok', ()=>{
    expect(ap('2')).toBe('2')
})

test('ap2 is ok', () => {
    expect(ap2()).toBe('1')
})

test('aPromise is ok', async () => {
    expect.assertions(1)
    let r = await aPromise()
    expect(r).toBe('message from aPromise')
})

// test('aPromise2 is ok', async () => {
//     expect.assertions(1)
//     let r2 = await fetch('https://www.baidu.com')
//     expect(r2).toBe('message from aPromise')
// })