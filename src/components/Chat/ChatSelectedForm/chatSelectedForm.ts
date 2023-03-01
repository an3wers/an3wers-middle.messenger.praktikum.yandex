import Block from '../../../core/block'
import template from './template.hbs'
import { Input } from '../../UI/Input/input'
import { Button } from '../../UI/Button/button'
import { IconArrowForward } from '../../UI/Icons/24/ArrowForward/iconArrowForward'

export class ChatSelectedForm extends Block {
  protected init(): void {
    this.children.ChatInput = new Input({
      styles: 'form-element form-element_round-full',
      placeholder: 'Сообщение',
      name: 'message',
      type: 'text'
    })

    this.children.SendButton = new Button({
      styles: 'btn btn_primary btn_icon btn_round-full',
      icon: new IconArrowForward({
        styles: 'btn-icon btn-icon_white'
      }),
      type: 'submut',
      events: {
        click: e => {
          e!.preventDefault()
          if (this.getValue('message')) {
            console.log({ message: this.getValue('message') })
          } else {
            console.error('Поле "message" не заполнено')
          }
        }
      }
    })
  }

  private getValue(name: string) {
    return (
      this.element!.querySelector(`input[name=${name}]`) as HTMLInputElement
    ).value
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
