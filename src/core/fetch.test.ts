/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, afterEach, after, before } from 'mocha'
import { expect } from 'chai'
import sinon, { SinonFakeXMLHttpRequest } from 'sinon'
import HTTPTransport from './fetch'

describe('HTTPTransport class', () => {
  let requests: SinonFakeXMLHttpRequest[] = []
  const baseUrl = 'https://ya-praktikum.tech/api/v2'
  let transport: HTTPTransport
  const data = { key: 'value' }

  const originalXHR = global.XMLHttpRequest

  before(() => {
    transport = new HTTPTransport(baseUrl, '/user')
    const XHR = sinon.useFakeXMLHttpRequest()

    // @ts-ignore
    global.XMLHttpRequest = XHR

    XHR.onCreate = (xhr: SinonFakeXMLHttpRequest) => {
      requests.push(xhr)
    }
  })

  afterEach(() => {
    requests = []
  })

  after(() => {
    global.XMLHttpRequest = originalXHR
  })

  describe('GET request', () => {
    it('should make GET request', () => {
      transport.get('/test')
      expect(requests[0].method).to.eql('GET')
    })

    it('should make GET request with query parametrs', () => {
      transport.get('/test', { data })
      expect(requests[0].url).to.be.contains('?key=value')
    })
  })

  describe('POST request', () => {
    it('should make POST request', () => {
      transport.post('/test')
      expect(requests[0].method).to.eql('POST')
    })

    it('should make POST request with body parametrs', () => {
      transport.post('/test', { data })
      expect(requests[0].requestBody).to.eql(JSON.stringify(data))
    })
  })

  describe('DELETE request', () => {
    it('should make DELETE request', () => {
      transport.delete('/test')
      expect(requests[0].method).to.eql('DELETE')
    })

    it('should make POST request with body parametrs', () => {
      transport.delete('/test', { data })
      expect(requests[0].requestBody).to.eql(JSON.stringify(data))
    })
  })

  describe('PUT request', () => {
    it('should make PUT request', () => {
      transport.put('/test')
      expect(requests[0].method).to.eql('PUT')
    })
    it('should make PUT request with body parametrs', () => {
      transport.put('/test', { data })
      expect(requests[0].requestBody).to.eql(JSON.stringify(data))
    })
  })
})
