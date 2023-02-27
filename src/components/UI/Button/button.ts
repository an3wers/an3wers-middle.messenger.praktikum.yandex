import Block from '../../../core/block'
import template from './template.hbs'

interface ButtonProps {
  id?: string
  label?: string
  styles: string
  type?: string
  events?: {
    [key: string]: (e: Event | undefined) => void
  }
  icon?: Block
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    props = 'type' in props ? props : { ...props, type: 'button' }
    super(props)
  }

  // protected componentDidMount(): void {
  //     console.log(this.getContent)
  // }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
