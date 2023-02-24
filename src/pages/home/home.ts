import Block from '../../core/block.ts'
import template from './template.hbs'
import data from '../../markup/data/contacts'
import { ContactsList } from '../../components/Chat/ContactsList/contsctsList.ts'
import { IconSettings } from '../../components/UI/Icons/20/Settings/iconSettings.ts'
import { IconSearch } from '../../components/UI/Icons/20/Search/iconSearch.ts'
import { IconPlus } from '../../components/UI/Icons/20/Plus/iconPlus.ts'
import { Button } from '../../components/UI/Button/button.ts'
import { ChatSelected } from '../../components/Chat/ChatSelected/chatSelected.ts'
import { Input } from '../../components/UI/Input/input.ts'
import { renderDom } from '../../core/router.ts'

export class HomePage extends Block {
  protected init(): void {
    this.children.ProfileButton = new Button({
      styles: 'btn btn_small btn_light',
      icon: new IconSettings({ styles: 'btn-icon btn-icon_light' }),
      label: 'Профиль',
      events: {
        click: () => {
          renderDom('#root', 'profile')
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
    this.children.ContactsList = new ContactsList({ data })
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
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
