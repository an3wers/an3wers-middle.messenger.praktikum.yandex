import { Link } from '../../components/UI/Link/link'
import Block from '../../core/block'
import template from './template.hbs'

export class ServerErrorPage extends Block {
  protected init(): void {
    this.children.BackButton = new Link({
      styles: 'btn btn_regular btn_secondary mt-4',
      label: 'Назад к чатам',
      to: '/messenger'
    })
  }
  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
