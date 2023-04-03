/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import set, { Indexed } from './set'

describe('set helper', () => {
  let obj = {}
  const path = 'a.b'
  const value = 'test'

  beforeEach(() => {
    obj = {}
  })

  it('should set a value by keypath', () => {
    const result = set(obj, path, value) as Indexed

    expect(result.a.b).to.eql(value)
  })

  it('should set a value by keypath if initial object is not empty', () => {
    const objNotEmpty = { c: { b: '2' } }

    const result = set(objNotEmpty, path, value)

    expect(result).to.deep.eq({ ...objNotEmpty, a: { b: 'test' } })
  })

  it('should return passed `object` parameter if it is not an object', () => {
    const notObj = 'string'

    const result = set(notObj, path, value)
    expect(result).to.eql(result)
  })

  it('should throw an Error if passed `path` parameter is not a string', () => {
    const pathAsNotString = 1

    // @ts-ignore
    const func = () => set(obj, pathAsNotString, value)
    expect(func).to.throw(Error)
  })

  it('should mutate passed object, not create a new one', () => {
    set(obj, path, value)

    expect(obj).to.haveOwnProperty('a')
  })
})
