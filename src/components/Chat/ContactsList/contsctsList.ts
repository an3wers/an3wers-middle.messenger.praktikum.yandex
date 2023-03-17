import { Chat } from '../../../api/types/chatTypes'
import chatsController from '../../../controllers/chatsController'
import Block from '../../../core/block'
import { withStore } from '../../../core/store'
import { ChatItem } from '../ChatItem/chatItem'
// import { Contact } from '../types'
import template from './temaplte.hbs'

interface ContactsListProps {
  // data: Contact[]
  chatList?: Chat[]
}

class ContactsListBase extends Block<ContactsListProps> {
  constructor(props: ContactsListProps) {
    super(props)
  }

  protected init(): void {
    this.children.Items = this.getChats(this.props)
  }

  protected getChats(props: ContactsListProps) {
    return props.chatList!.map(item => {
      console.log('itemItem', item)
      return new ChatItem({
        ...item,
        events: {
          click: () => {
            // console.log('Click item', item.id)
            chatsController.selectChat(item.id)
          }
        }
      })
    })
  }

  protected componentDidUpdate(
    oldProps: ContactsListProps,
    newProps: ContactsListProps
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

const withChats = withStore(state => ({ chatList: [...state.chatList.data] }))
export const ContactsList = withChats(ContactsListBase)
