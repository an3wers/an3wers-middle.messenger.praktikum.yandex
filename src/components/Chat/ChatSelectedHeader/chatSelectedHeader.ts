import { Chat } from '../../../api/types/chatTypes'
import Block from '../../../core/block'
import { withStore } from '../../../core/store'
import { Button } from '../../UI/Button/button'
import { IconDelete } from '../../UI/Icons/20/Delete/iconDelete'
import { IconEdit } from '../../UI/Icons/20/Edit/iconEdit'
import { IconMinus } from '../../UI/Icons/20/Minus/iconMinus'
import { IconPlus } from '../../UI/Icons/20/Plus/iconPlus'
import { IconMore } from '../../UI/Icons/24/More/iconMore'
import { Modal } from '../../UI/Modal/modal'
import { SuccessBlock } from '../../UI/SuccessBlock/successBlock'
import { ChatAddUserForm } from '../ChatAddUserForm/chatAddUserForm'
import { ChatRemoveUserForm } from '../ChatRemoveUserForm/chatRemoveUserForm'
import template from './template.hbs'

interface ChatSelectedHeaderProps {
  name?: string
}

class ChatSelectedHeaderBase extends Block<ChatSelectedHeaderProps> {
  constructor(props: ChatSelectedHeaderProps) {
    super(props)
  }

  protected init(): void {
    this.children.MoreButton = new Button({
      icon: new IconMore({ styles: 'btn-icon btn-icon_light' }),
      styles: 'btn btn_icon btn_light'
    })
    this.children.AddUserButton = new Button({
      styles: 'dropdown__item btn btn_small btn_link',
      label: 'Добавить пользователя',
      icon: new IconPlus({ styles: 'btn-icon btn-icon_dark' }),
      events: {
        click: () => {
          if (!Array.isArray(this.children.ModalAddUser)) {
            this.children.ModalAddUser.setProps({ isSuccessState: false })
            this.children.ModalAddUser.show()
          }
        }
      }
    })
    this.children.RemoveUser = new Button({
      styles: 'dropdown__item btn btn_small btn_link',
      label: 'Удалить пользователя',
      icon: new IconMinus({ styles: 'btn-icon btn-icon_dark' }),
      events: {
        click: () => {
          if (!Array.isArray(this.children.ModalRemoverUser)) {
            this.children.ModalRemoverUser.setProps({ isSuccessState: false })
            this.children.ModalRemoverUser.show()
          }
        }
      }
    })
    this.children.EditChat = new Button({
      styles: 'dropdown__item btn btn_small btn_link',
      label: 'Редактировать чат',
      icon: new IconEdit({ styles: 'btn-icon btn-icon_dark' })
    })
    this.children.RemoveChat = new Button({
      styles: 'dropdown__item btn btn_small btn_link btn_danger',
      label: 'Удалить чат',
      icon: new IconDelete({ styles: 'btn-icon btn-icon_danger' })
    })

    this.children.ModalAddUser = new Modal({
      title: 'Добавить пользователя',
      body: new ChatAddUserForm({
        closeHandler: this.closeModal.bind(this),
        switchHadler: this.switchStateModal.bind(this)
      }),
      successBody: new SuccessBlock({
        message: 'Пользователь успешно добавлен',
        context: 'ModalAddUser',
        handler: this.closeModal.bind(this)
      })
    })

    this.children.ModalRemoverUser = new Modal({
      title: 'Удалить пользователя',
      body: new ChatRemoveUserForm({
        closeHandler: this.closeModal.bind(this),
        switchHadler: this.switchStateModal.bind(this)
      }),
      successBody: new SuccessBlock({
        message: 'Пользователь успешно удален',
        context: 'ModalRemoverUser',
        handler: this.closeModal.bind(this)
      })
    })
  }

  protected switchStateModal(modal: string) {
    ;(this.children[modal] as Block).setProps({ isSuccessState: true })
    ;(this.children[modal] as Block).show()
  }

  protected closeModal(modal: string) {
    ;(this.children[modal] as Block).hide()
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}

const withChatName = withStore(state => {
  const current = state.chatList.data.find(
    (el: Chat) => el.id === state.selectedChat
  )

  return {
    name: current ? current.title : ''
  }
})

export const ChatSelectedHeader = withChatName(ChatSelectedHeaderBase)
