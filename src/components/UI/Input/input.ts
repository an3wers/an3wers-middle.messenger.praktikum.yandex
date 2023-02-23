import Block from '../../../core/block.ts'
import template from './template.hbs'

interface IputProps {
  id?: string
  styles: string
  type?: string
  name?: string
  value?: string
  placeholder?: string,
  events?: {
    [key: string]: () => void
  }
}

export class Input extends Block {
  constructor(props: IputProps) {
    super(props)
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, type: 'text' })
  }
}
