import Block from '../../core/block'
import { renderDom } from '../../core/renderDom'
import template from './temaplate.hbs'

export class Navigation extends Block {
  protected componentDidMount(): void {
    const linksNodes = this.element!.querySelectorAll('[data-page]')
    const links = Array.from(linksNodes)
    links.forEach(link => {
      link.addEventListener('click', this.handler)
    })
  }

  private handler(e: Event) {
    e.preventDefault()
    const page = (e.target as HTMLElement).getAttribute('data-page')
    if (page) {
      renderDom('#root', page)
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
