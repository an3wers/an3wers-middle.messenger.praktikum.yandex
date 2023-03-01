import Block from '../../../core/block'
import { ChatSelectedFooter } from '../ChatSelectedFooter/chatSelectedFooter'
import { ChatSelectedHeader } from '../ChatSelectedHeader/chatSelectedHeader'
import template from './template.hbs'
import img from '../../../../static/images/mock-chat.jpg'
import { IconCheck } from '../../UI/Icons/14/Check/iconCheck'

interface ChatSelectedProps {
  img?: string
}

export class ChatSelected extends Block<ChatSelectedProps> {
  constructor(props: ChatSelectedProps) {
    super(props)
  }

  protected init(): void {
    this.children.ChatHeader = new ChatSelectedHeader({ name: 'Илья' })
    this.children.ChatFooter = new ChatSelectedFooter()
    this.children.CheckIcon = new IconCheck({ styles: 'feed-item__icon-check' })
  }

  protected render(): DocumentFragment {
    return this.compile(template, { img })
  }
}
