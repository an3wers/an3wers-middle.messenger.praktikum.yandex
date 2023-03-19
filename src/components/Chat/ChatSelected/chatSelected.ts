import Block from '../../../core/block'
import { ChatSelectedFooter } from '../ChatSelectedFooter/chatSelectedFooter'
import { ChatSelectedHeader } from '../ChatSelectedHeader/chatSelectedHeader'
import template from './template.hbs'
// import img from '../../../../static/images/mock-chat.jpg'
// import { IconCheck } from '../../UI/Icons/14/Check/iconCheck'
import { withStore } from '../../../core/store'
import { MessageType } from '../../../api/types/messagesTypes'
import { Message } from '../Message/message'

interface ChatSelectedProps {
  selectedChat?: number | undefined
  messages?: MessageType[]
  userId?: number
}

class ChatSelectedBase extends Block<ChatSelectedProps> {
  constructor(props: ChatSelectedProps) {
    super(props)
  }

  protected init(): void {
    this.children.ChatHeader = new ChatSelectedHeader({})
    this.children.ChatFooter = new ChatSelectedFooter()
    this.children.Messeges = this.getMessages(this.props)
    // this.children.CheckIcon = new IconCheck({ styles: 'feed-item__icon-check' })
  }

  protected getMessages(props: ChatSelectedProps) {

    return props.messages!.map(data => {
        return new Message({
          content: data.content,
          isSelf: props.userId === data.user_id
        })
    })
  }

  protected componentDidUpdate(
    oldProps: ChatSelectedProps,
    newProps: ChatSelectedProps
  ): boolean {
    this.children.Messeges = this.getMessages(newProps)

    return true
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}

const withSelectedMesseges = withStore(state => {
  const selectedChatId = state.selectedChat

  if (!selectedChatId) {
    return { messages: [], selectedChat: 0, userId: state.user?.data?.id }
  }
  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user?.data?.id
  }
})

export const ChatSelected = withSelectedMesseges(ChatSelectedBase)
