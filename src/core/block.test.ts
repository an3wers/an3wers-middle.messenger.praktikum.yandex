/* eslint-disable max-classes-per-file */
/* eslint-disable import/no-extraneous-dependencies */
import { describe, beforeEach, it } from 'mocha'
import { expect } from 'chai'
import proxyquire from 'proxyquire'
import type BlockType from './block'
import { EventBus } from './eventBus'

const { default: Block } = proxyquire('./block', {
  './eventBus': {
    EventBus: class extends EventBus {}
  }
}) as { default: typeof BlockType }

describe('Block', () => {
  let isCalled = false
  beforeEach(() => {
    isCalled = false
  })

  it('should call init event on initialization', () => {
    class ComponentsMock extends Block {
      protected init(): void {
        isCalled = true
      }
    }

    // @ts-ignore
    const component = new ComponentsMock()
    expect(isCalled).to.eql(true)
  })

  it('should call protected componentDidMount on component-did-mount dispatch', () => {
    class ComponentMock extends Block {
      componentDidMount() {
        isCalled = true
      }
    }
    const component = new ComponentMock({})
    component.dispatchComponentDidMount()
    expect(isCalled).to.eql(true)
  })

  it('should call protected component did update after set new props', () => {
    class ComponentMock extends Block {
      // @ts-ignore
      componentDidUpdate(oldProps: any, newProps: any): boolean {
        isCalled = true
        return true
      }
    }

    const component = new ComponentMock({ key: 'value' })
    component.setProps({ key: 'newValue' })
    expect(isCalled).to.eql(true)
  })

  it('should return node element', () => {
    class ComponentMock extends Block {
      render() {
        const fragment = new DocumentFragment()
        const element = document.createElement('span')
        fragment.append(element)
        return fragment
      }
    }
    const component = new ComponentMock()
    const node = component.getContent()
    expect(node).to.be.instanceOf(window.HTMLSpanElement)
  })

  it('node element should include style `block`', () => {
    class ComponentMock extends Block {
      render() {
        const fragment = new DocumentFragment()
        const element = document.createElement('span')
        fragment.append(element)
        return fragment
      }
    }
    const component = new ComponentMock()
    component.show()
    const node = component.getContent()
    expect(node?.style.display).to.be.eql('block')
  })
  it('node element should include style `none`', () => {
    class ComponentMock extends Block {
      render() {
        const fragment = new DocumentFragment()
        const element = document.createElement('span')
        fragment.append(element)
        return fragment
      }
    }
    const component = new ComponentMock()
    component.hide()
    const node = component.getContent()
    expect(node?.style.display).to.be.eql('none')
  })
})
