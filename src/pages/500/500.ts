import { Button } from '../../components/UI/Button/button'
import Block from '../../core/block'
import { renderDom } from '../../core/renderDom'
import template from './template.hbs'

export class ServerErrorPage extends Block {
  protected init(): void {
    this.children.BackButton = new Button({
      styles: 'btn btn_regular btn_secondary mt-4',
      label: 'Назад к чатам',
      events: {
        click: () => {
          renderDom('#root', 'home')
        }
      }
    })
  }
  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
