import Block from '../../../core/block'
import template from './template.hbs'

interface ErrorMessageProps {
  text: string | null
}

export class ErrorMessage extends Block<ErrorMessageProps> {
  constructor(props: ErrorMessageProps) {
    super(props)
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}
