/* eslint-disable import/no-extraneous-dependencies */
import { describe, it } from 'mocha'
import { expect } from 'chai'
import isEqual from './isEqual'

describe('isEqual', () => {
  it('Should return true if the passed parameters are the same objects', () => {
    const objA = { a: 'a' }
    const objB = { a: 'a' }

    const result = isEqual(objA, objB)
    expect(result).to.be.eql(true)
  })

  it('Should return false if the passed parameters are the different objects', () => {
    const objA = { a: 'a', c: { cc: 'cc' } }
    const objB = { b: 'b', d: { dd: 'dd' } }

    const result = isEqual(objA, objB)
    expect(result).to.be.eql(false)
  })

  it('Should return true if the passed parameters are the same arrays', () => {
    const arrA = [1, 2, 3, [5, 6]]
    const arrB = [1, 2, 3, [5, 6]]

    const result = isEqual(arrA, arrB)
    expect(result).to.be.eql(true)
  })

  it('Should return true if the passed parameters are the same strings', () => {
    const stringA = 'string'
    const stringB = 'string'

    const result = isEqual(stringA, stringB)
    expect(result).to.be.eql(true)
  })
})
