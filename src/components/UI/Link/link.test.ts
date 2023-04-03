/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { BaseLink as Link } from './link'
import Router from '../../../core/router/router'

describe('Link component', () => {
  const route = '/'
  const label = 'Home page'
  const cb = sinon.stub()
  // @ts-ignore
  const router = { go: cb } as typeof Router

  beforeEach(() => {
    cb.reset()
  })

  it('should render', () => {
    // @ts-ignore
    const link = new Link({
      to: route,
      label,
      router
    })
  })

  it('should return `a` element', () => {
    const link = new Link({
      to: route,
      label,
      router
    })

    expect(link.element).to.be.instanceOf(window.HTMLAnchorElement)
  })

  it('should render passed label', () => {
    const link = new Link({ to: route, label, router })

    expect(link.element?.textContent).to.eql(label)
  })

  it('should call Router.go() with passed route on click', () => {
    const link = new Link({ to: route, label, router })

    link.element?.click()

    expect(cb.calledWith(route)).to.eql(true)
  })
})
