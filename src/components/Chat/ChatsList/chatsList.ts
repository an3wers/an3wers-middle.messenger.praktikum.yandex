import { Chat } from '../../../api/types/chatTypes'
import chatsController from '../../../controllers/chatsController'
import Block from '../../../core/block'
import { withStore } from '../../../core/store'
import { ChatItem } from '../ChatItem/chatItem'
import template from './temaplte.hbs'

interface ChatsListProps {
  chatList?: Chat[]
  chatSelectedId?: number
}

class ChatsListBase extends Block<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super(props)
  }

  protected init(): void {
    this.children.Items = this.getChats(this.props)
  }

  protected getChats(props: ChatsListProps) {
    return props.chatList!.map(item => {
      return new ChatItem({
        ...item,
        isActive: props.chatSelectedId === item.id,
        events: {
          click: () => {
            chatsController.selectChat(item.id)
          }
        }
      })
    })
  }

  protected componentDidUpdate(
    oldProps: ChatsListProps,
    newProps: ChatsListProps
  ): boolean {
    this.children.Items = this.getChats(newProps)

    return true
  }

  protected render(): DocumentFragment {
    return this.compile(template, {
      chatList: this.props.chatList,
      isChats: this.props.chatList?.length
    })
  }
}

const withChats = withStore(state => ({
  chatSelectedId: state.selectedChat,
  chatList: [...state.chatList.data]
}))
export const ChatsList = withChats(ChatsListBase)
