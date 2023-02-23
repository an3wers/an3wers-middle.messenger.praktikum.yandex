import Block from '../../../core/block.ts'
import { Contact } from '../types/types.ts'
import template from './temaplte.hbs'

interface ContactsListProps {
  data: Contact[]
}

export class ContactsList extends Block {
  constructor(props: ContactsListProps) {
    super(props)
  }

  protected render(): DocumentFragment {
    return this.compile(template, { data: this.props.data })
  }
}
