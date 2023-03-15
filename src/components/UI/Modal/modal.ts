import Block from '../../../core/block'
import { Button } from '../Button/button'
import { IconClose } from '../Icons/24/Close/iconClose'
import template from './template.hbs'

interface ModalProps {
  title: string
  body: Block
  isSuccessState?: boolean
  successBody?: Block | string
}

export class Modal extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super(props)
  }

  protected init(): void {
    this.children.CloseButton = new Button({
      styles: 'modal__close',
      icon: new IconClose({ styles: 'btn-icon btn-icon_light' }),
      events: {
        click: () => {
          this.hide()
        }
      }
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
