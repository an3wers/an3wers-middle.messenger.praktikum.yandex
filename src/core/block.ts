import { v4 as makeId } from 'uuid'
import { TemplateDelegate } from 'handlebars'
import { EventBus } from './eventBus.ts'

// interface Props {
//   [key: string]: any
// }

interface Children {
  [key: string]: Block
}

abstract class Block<Props extends { [key: string]: any } = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  }

  private _element: HTMLElement | null = null
  public id: string
  public children: Children
  protected props: Props
  private eventBus: () => EventBus

  constructor(propsAndChildren: { [key: string]: any } = {}) {
    const eventBus = new EventBus()
    const { children, props } = this._getChildren(propsAndChildren)

    this.children = children

    this.id = makeId()

    this.props = this._makePropsProxy({ ...props, id: this.id })

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  private _removeEvent() {

    const { events = {} } = this.props

    Object.keys(events).forEach(eventName => {
      this._element.removeEventListener(eventName, events[eventName])
    })
  }

  private _addEvents() {
    const { events = {} } = this.props
    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName])
    })
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
  }

  private _getChildren(propsAndChildren: { [key: string]: any }) {
    const children = {}
    const props = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { children, props }
  }

  private _init() {
    // this._createResources();
    this.init()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  protected init() {}
  // (context: any) => string
  protected compile(template: TemplateDelegate, context: Props) {
    // contextAndStubs пропсы и временные загушки
    // все это нужно для того чтобы сохранить события на элементах
    const contextAndStubs = { ...context } as { [key: string]: any }

    Object.entries(this.children).forEach(([key, child]) => {
      contextAndStubs[key] = `<div data-id="${child.id}"></div>`
    })

    const html = template(contextAndStubs)

    const temp = this._createDocumentElement('template') as HTMLTemplateElement

    temp.innerHTML = html

    Object.values(this.children).forEach(child => {
      const stub = temp.content.querySelector(`[data-id="${child.id}"]`)

      if (!stub) {
        return
      }

      child.getContent()?.append(...Array.from(stub.childNodes))

      stub.replaceWith(child.getContent())
    })

    return temp.content

    // return html
  }

  private _componentDidMount() {
    this.componentDidMount()

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount()
    })
  }

  protected componentDidMount() {}

  // Вызываем снаружи когда компонент отобразился на странице
  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
    Object.values(this.children).forEach(child =>
      child.dispatchComponentDidMount()
    )
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props) {
    return true
  }

  protected setProps = (nextProps: Props) => {
    if (!nextProps) {
      return
    }
    Object.assign(this.props, nextProps)
  }

  get element() {
    return this._element
  }

  private _render() {
    const block = this.render()
    // Это небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно компилировать не в строку (или делать это правильно),
    // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду

    // Удалить старые события через removeEventListener

    const firstEl = block.firstElementChild

    if (this._element) {
      this._element.replaceWith(firstEl)
    }

    this._element = firstEl as HTMLElement
    this._removeEvent()
    this._addEvents()

    // Навесить новые события через addEventListener
  }

  // Переопределяется пользователем. Необходимо вернуть разметку
  protected render() {
    return new DocumentFragment()
  }

  getContent() {
    return this.element
  }

  private _makePropsProxy(props: { [key: string]: any }) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this

    return new Proxy(props, {
      get(target: { [key: string]: any }, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop: string, value) {
        if (target[prop] === value) {
          return true
        }

        const oldTarget = { ...target }

        target[prop] = value

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty() {
        throw new Error('Отказано в доступе')
      }
    }) as Props
  }

  private _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName)
    element.setAttribute('data-id', this.id)
    return element
  }

  show() {
    this.getContent().style.display = 'block'
  }

  hide() {
    this.getContent().style.display = 'none'
  }
}

export default Block
