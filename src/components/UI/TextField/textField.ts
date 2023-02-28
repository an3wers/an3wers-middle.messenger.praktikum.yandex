import Block from '../../../core/block'
import template from './template.hbs'

interface TextFieldProps {
  label: string
  for: string
  input: Block
  error?: Block
}

export class TextField extends Block<TextFieldProps> {
  constructor(props: TextFieldProps) {
    super(props)
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
