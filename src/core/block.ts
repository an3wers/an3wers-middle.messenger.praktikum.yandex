import { v4 as makeId } from 'uuid'
import { TemplateDelegate } from 'handlebars'
import { EventBus } from './eventBus'

interface Children {
  [key: string]: Block | Block[]
}

abstract class Block<P extends { [key: string]: any } = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  }

  private _element: HTMLElement | null = null
  public id: string
  public children: Children
  protected props: P
  private eventBus: () => EventBus

  constructor(propsAndChildren: P = {} as P) {
    const eventBus = new EventBus()
    const { children, props } = this._getChildren(propsAndChildren)

    this.children = children

    this.id = makeId()

    this.props = this._makePropsProxy(props)

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  private _removeEvent() {
    const { events = {} } = this.props

    Object.keys(events).forEach(eventName => {
      this._element!.removeEventListener(eventName, events[eventName])
    })
  }

  private _addEvents() {
    const { events = {} } = this.props
    Object.keys(events).forEach(eventName => {
      this._element!.addEventListener(eventName, events[eventName])
    })
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
  }

  private _getChildren(propsAndChildren: P): {
    props: P
    children: Record<string, Block | Block[]>
  } {
    const props: Record<string, unknown> = {}
    const children: Record<string, Block | Block[]> = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (
        Array.isArray(value) &&
        value.length > 0 &&
        value.every(v => v instanceof Block)
      ) {
        children[key as string] = value
      } else if (value instanceof Block) {
        children[key as string] = value
      } else {
        props[key] = value
      }
    })

    return { props: props as P, children }
  }

  private _init() {
    this.init()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  protected init() {}

  protected compile(template: TemplateDelegate, context: any) {
    const contextAndStubs = { ...context } as { [key: string]: any }

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        contextAndStubs[key] = child.map(el => `<div data-id="${el.id}"></div>`)
      } else {
        contextAndStubs[key] = `<div data-id="${child.id}"></div>`
      }
    })

    const html = template(contextAndStubs)

    const temp = this._createDocumentElement('template') as HTMLTemplateElement

    temp.innerHTML = html

    const replaceStub = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`)

      if (!stub) {
        return
      }

      component.getContent()?.append(...Array.from(stub.childNodes))

      stub.replaceWith(component.getContent()!)
    }

    Object.entries(this.children).forEach(([_, child]) => {
      if (Array.isArray(child)) {
        child.forEach(replaceStub)
      } else {
        replaceStub(child)
      }
    })

    return temp.content
  }

  private _componentDidMount() {
    this.componentDidMount()

    // Object.values(this.children).forEach(child => {
    //   child.dispatchComponentDidMount()
    // })
  }

  protected componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
    Object.values(this.children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(el => el.dispatchComponentDidMount())
      } else {
        child.dispatchComponentDidMount()
      }
    })
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }
  // @ts-ignore
  protected componentDidUpdate(oldProps: P, newProps: P) {
    return true
  }

  public setProps = (nextProps: P) => {
    if (!nextProps) {
      return
    }
    Object.assign(this.props, nextProps)
  }

  public getProps = () => this.props

  get element() {
    return this._element
  }

  private _render() {
    const block = this.render()
    const firstEl = block.firstElementChild as Element

    if (this._element) {
      this._element.replaceWith(firstEl)
    }

    this._element = firstEl as HTMLElement
    this._removeEvent()
    this._addEvents()
  }

  protected render() {
    return new DocumentFragment()
  }

  getContent() {
    return this.element
  }

  private _makePropsProxy(props: any) {
    const self = this

    return new Proxy(props, {
      get(target: P, prop: any) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop: string, value) {
        if (target[prop] === value) {
          return true
        }

        const oldTarget = { ...target }

        target[prop as keyof P] = value

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty() {
        throw new Error('Отказано в доступе')
      }
    }) as P
  }

  private _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName)
    element.setAttribute('data-id', this.id)
    return element
  }

  show() {
    this.getContent()!.style.display = 'block'
  }

  hide() {
    this.getContent()!.style.display = 'none'
  }
}

export default Block
