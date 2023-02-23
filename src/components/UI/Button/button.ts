import Block from '../../../core/block.ts'
import template from './template.hbs'

interface ButtonProps {
  id?: string,
  label?: string
  styles: string
  type?: string
  events?: {
    [key: string]: () => void
  }
  icon?: Block
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props)
  }

  // protected componentDidMount(): void {
  //     console.log(this.getContent)
  // }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, type: 'button' })
  }
}
