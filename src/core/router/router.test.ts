/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai'
import { describe, before, after, it } from 'mocha'
import sinon from 'sinon'
import Router from './router'
import Block from '../block'

describe('Router', () => {
  const originalBack = global.window.history.back
  const originalForward = global.window.history.forward

  const getContentFake = sinon.fake.returns(document.createElement('div'))

  const BlockMock = class {
    getContent = getContentFake
    dispatchComponentDidMount = () => {}
  } as unknown as typeof Block

  before(() => {
    global.window.history.back = () => {
      if (typeof window.onpopstate === 'function') {
        window.onpopstate({ currentTarget: window } as unknown as PopStateEvent)
      }
    }
    global.window.history.forward = () => {
      if (typeof window.onpopstate === 'function') {
        window.onpopstate({ currentTarget: window } as unknown as PopStateEvent)
      }
    }
  })

  after(() => {
    global.window.history.back = originalBack
    global.window.history.forward = originalForward
  })

  it('use() should return Router instance', () => {
    const result = Router.use('/', BlockMock)
    expect(result).to.eql(Router)
  })

  it('back() should return a page on history back action', () => {
    Router.use('/', BlockMock).start()
    Router.back()

    expect(getContentFake.callCount).to.eql(1)
  })

  it('forward() should return a page on history forward action', () => {
    Router.use('/', BlockMock).start()
    Router.forward()

    expect(getContentFake.callCount).to.eql(1)
  })

  it('should render a page on start', () => {
    Router
      .use('/', BlockMock)
      .start();

    expect(getContentFake.callCount).to.eq(1);
  });

})
