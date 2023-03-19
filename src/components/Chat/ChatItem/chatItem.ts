import Block from '../../../core/block'
import { useDateFormatter } from '../../../helpers/dateFormatter'
import template from './template.hbs'

interface ChatItemProps {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: {
    user: {
      first_name: string
      second_name: string
      avatar: string
      email: string
      login: string
      phone: string
    }
    time: string
    content: string
  }
  isActive?: boolean
  events: {
    click: () => void
  }
}

export class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super(props)
  }

  protected init(): void {
    if (this.props.last_message) {
      this.props.last_message.time = useDateFormatter(this.props.last_message.time)
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, {
      ...this.props,
    })
  }
}
