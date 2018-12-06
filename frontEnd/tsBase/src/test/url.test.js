import {getQueryString, jsonToParams, aPromise} from '../utils/url.js'


test('getQueryString is best', ()=>{
  let url1 = 'https://testh5.niiwoo.com/breakoutWar2/#/loading?shareCode=0023&linkCode=153335670386008064'
  let url2 = 'https://testh5.niiwoo.com/breakoutWar2?shareCode=0023&linkCode=153335670386008064/#/loading'
  expect(getQueryString('shareCode', url1)).toBe('0023')
  expect(getQueryString('shareCode', url2)).toBe('0023')
})


test('jsonToParams is ok', ()=>{
  let data = {
    shareCode : '0023',
    linkCode: '153335670386008064'
  }
  expect(jsonToParams(data)).toBe('shareCode=0023&linkCode=153335670386008064')
})


test('pro is best2', async ()=>{
  expect.assertions(1)
  await expect(aPromise()).resolves.toBe('message from aPromise')
})
