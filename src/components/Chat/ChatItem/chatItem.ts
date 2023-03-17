import { Chat } from '../../../api/types/chatTypes'
import Block from '../../../core/block'
import { withStore } from '../../../core/store'
import template from './template.hbs'

interface ChatItemProps {
  id: number
  title: string,
  avatar: string,
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
  itemSelected?: Chat
  events: {
    click: () => void
  }
}

class ChatItemBase extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super(props)
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props, isActive: this.props.id === this.props.itemSelected?.id})
  }
}

const withItem = withStore(state => {
  return {itemSelected: state.chatList.data.find((el: Chat) => el.id === state.selectedChat) || {}}
})

export const ChatItem = withItem(ChatItemBase)
