import Block from '../../../core/block'
import template from './template.hbs'

interface MessageProps {
  content: string
  isSelf: boolean
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super(props)
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
