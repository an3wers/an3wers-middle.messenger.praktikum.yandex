import Block from '../../core/block'
import template from './template.hbs'
// import data from '../../markup/data/contacts.js'
import { ContactsList } from '../../components/Chat/ContactsList/contsctsList'
import { IconSettings } from '../../components/UI/Icons/20/Settings/iconSettings'
import { IconSearch } from '../../components/UI/Icons/20/Search/iconSearch'
import { IconPlus } from '../../components/UI/Icons/20/Plus/iconPlus'
import { Button } from '../../components/UI/Button/button'
import { ChatSelected } from '../../components/Chat/ChatSelected/chatSelected'
import { Input } from '../../components/UI/Input/input'
import { Navigation } from '../../components/Navigation/navigation'
import { ChatEmpty } from '../../components/Chat/ChatEmpty/chatEmpty'
import chatsController from '../../controllers/chatsController'
import { withStore } from '../../core/store'
import { Modal } from '../../components/UI/Modal/modal'
import { SuccessBlock } from '../../components/UI/SuccessBlock/successBlock'
import { ChatCreateForm } from '../../components/Chat/ChatCreateForm/chatCreateForm'

// interface HomePageProps {
//   isSelected: boolean
// }

class HomePageBase extends Block {
  
  protected init(): void {
    this.children.Navigation = new Navigation({})

    this.children.ProfileButton = new Button({
      styles: 'btn btn_small btn_light',
      icon: new IconSettings({ styles: 'btn-icon btn-icon_light' }),
      label: 'Профиль',
      events: {
        click: () => {
          // renderDom('#root', 'profile')
          // router.go()
        }
      }
    })
    this.children.IconSearch = new IconSearch({
      styles: 'search-sidebar__icon'
    })
    this.children.SearchInput = new Input({
      styles: 'form-element search-sidebar__input',
      id: 'sidebar-search',
      placeholder: 'Поиск',
      type: 'search',
      name: 'search'
    })

    this.children.ContactsList = new ContactsList({})

    this.children.CreateChatButton = new Button({
      styles: 'btn btn_small btn_light',
      icon: new IconPlus({ styles: 'btn-icon btn-icon_light' }),
      label: 'Создать чат',
      events: {
        click: () => {
          // console.log('click create chat button')
          if (!Array.isArray(this.children.ModalCreateChat)) {
            this.children.ModalCreateChat.setProps({ isSuccessState: false })
            this.children.ModalCreateChat.show()
          }
        }
      }
    })

    this.children.ModalCreateChat = new Modal({
      title: 'Создать чат',
      body: new ChatCreateForm({
        closeHandler: this.closeModal.bind(this),
        switchHadler: this.switchStateModal.bind(this)
      }),
      successBody: new SuccessBlock({
        message:
          'Чат успешно создан, теперь добавьте пользователей и загрузите аватарку',
        context: 'ModalCreateChat',
        handler: this.closeModal.bind(this)
      }),
      isSuccessState: false
    })

    this.children.ChatSelected = new ChatSelected({})
    this.children.Empty = new ChatEmpty({})

    // get chats
    chatsController.getChats()
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

const withChats = withStore(state => {
  return {
    isSelected: !!state.selectedChat
  }
})
export const HomePage = withChats(HomePageBase)
