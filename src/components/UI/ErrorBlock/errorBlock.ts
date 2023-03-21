import Block from '../../../core/block'
import template from './template.hbs'

interface ErrorBockProps {
  message: string
}

export class ErrorBock extends Block<ErrorBockProps> {
  constructor(props: ErrorBockProps) {
    super(props)
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
