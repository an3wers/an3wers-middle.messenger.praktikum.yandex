import Block from '../../../core/block'
import { Button } from '../Button/button'
import template from './template.hbs'

interface SuccessBlockProps {
  message: string,
  context: string
  handler: (value: string) => void
}

export class SuccessBlock extends Block<SuccessBlockProps> {
  constructor(props: SuccessBlockProps) {
    super(props)
  }

  protected init(): void {
    this.children.Button = new Button({
      label: 'Ок',
      styles: 'btn btn_secondary btn_regular ',
      events: {
        click: () => {
          this.props.handler(this.props.context)
        }
      }
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
