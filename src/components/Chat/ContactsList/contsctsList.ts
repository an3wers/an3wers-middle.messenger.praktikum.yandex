import { Chat } from '../../../api/types/chatTypes'
import Block from '../../../core/block'
import { withStore } from '../../../core/store'
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

  protected render(): DocumentFragment {
    return this.compile(template, {chatList: this.props.chatList, isChats: this.props.chatList?.length})
  }
}

const withChats = withStore(state => ({chatList: [...state.chatList.data]}))
export const ContactsList = withChats(ContactsListBase)
