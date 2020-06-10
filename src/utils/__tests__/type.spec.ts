import { isNumber, isObject } from '../type'

describe('isNumber', () => {
  it('number', () => expect(isNumber(0)).toBeTruthy())
  it('object', () => expect(isNumber({ x: 0 })).toBeFalsy())
  it('boolean', () => expect(isNumber(true)).toBeFalsy())
  it('string', () => expect(isNumber('test')).toBeFalsy())
})

describe('isNumber', () => {
  it('number', () => expect(isObject(0)).toBeFalsy())
  it('object', () => expect(isObject({ x: 0 })).toBeTruthy())
  it('boolean', () => expect(isObject(true)).toBeFalsy())
  it('string', () => expect(isObject('test')).toBeFalsy())
})
