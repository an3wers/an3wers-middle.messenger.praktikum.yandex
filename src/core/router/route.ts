import isEqual from '../../utils/isEqual'
import Block from '../block'
import { render } from '../renderDom'

export class Route {
  private _pathname: string
  private _blockClass: any
  private _block: Block | null
  private _props

  constructor(
    pathname: string,
    view: typeof Block,
    props: { [key: string]: any }
  ) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave() {
    if (this._block) {
      this._block.hide()
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname)
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({})
      render(this._props.rootQuery, this._block as Block)
      return
    }

    this._block.show()
  }
}
