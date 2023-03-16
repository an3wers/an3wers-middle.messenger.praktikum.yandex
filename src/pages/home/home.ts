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
// import { withStore } from '../../core/store'

export class HomePage extends Block {

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
          console.log('click create chat button')
        }
      }
    })
    this.children.ChatSelected = new ChatSelected({})
    this.children.Empty = new ChatEmpty({})

    // get chats
    chatsController.getChats()

  }

  protected render(): DocumentFragment {
    return this.compile(template, { state: true })
  }
}

// const withChats = withStore(state => ({...state.chatList}))
// export const HomePage = withChats(HomePageBase)
