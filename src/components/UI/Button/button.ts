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

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    props = 'type' in props ? props : { ...props, type: 'button' }
    super(props)
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
