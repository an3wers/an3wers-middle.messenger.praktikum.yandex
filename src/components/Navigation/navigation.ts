import Block from '../../core/block.ts'
import { renderDom } from '../../core/router.ts'
// import { Button } from "../UI/Button/button.ts";
import template from './temaplate.hbs'

export class Navigation extends Block {
  protected componentDidMount(): void {
    const linksNodes = this.element.querySelectorAll('[data-page]')
    const links = Array.from(linksNodes)
    links.forEach(link => {
      link.addEventListener('click', this.handler)
    })
  }

  private handler(e: Event) {
    e.preventDefault()
    const page = (e.target as HTMLElement).getAttribute('data-page')
    renderDom('#root', page)
  }


  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
