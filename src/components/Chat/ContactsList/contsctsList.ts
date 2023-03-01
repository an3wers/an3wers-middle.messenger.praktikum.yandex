import Block from '../../../core/block'
import { Contact } from '../types'
import template from './temaplte.hbs'

interface ContactsListProps {
  data: Contact[]
}

export class ContactsList extends Block<ContactsListProps> {
  constructor(props: ContactsListProps) {
    super(props)
  }

  protected render(): DocumentFragment {
    return this.compile(template, { data: this.props.data })
  }
}
