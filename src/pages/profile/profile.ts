import { Button } from '../../components/UI/Button/button'
import { IconArrowBack } from '../../components/UI/Icons/20/ArrowBack/iconArrowBack'
import Block from '../../core/block'
import template from './template.hbs'
import { renderDom } from '../../core/router'
import { ProfileName } from '../../components/Profile/ProfileName/profileName'
import { ProfileAvatar } from '../../components/Profile/ProfileAvatar/profileAvatar'
import avatar from '../../../static/images/default-avatar-profile.jpg'
import profileData from '../../markup/data/userProfile'
import { ProfileInfo } from '../../components/Profile/ProfileInfo/profileInfo'

export class ProfilePage extends Block {
  /*
        Кнопка назад
        Хедер профиля
        Блок инфо
        Кнопки
        Модальное окно редактирования данных профиля
        Модальное окно изменения пароля
    */

  protected init(): void {

    this.children.ProfileAvatar = new ProfileAvatar({ avatar })
    
    this.children.ProfileName = new ProfileName({name: 'Иван'})

    this.children.ProfileInfo = new ProfileInfo({profileData})

    this.children.EditProfileButton = new Button({
      label: 'Изменить данные',
      styles: 'btn btn_regular btn_secondary',
      events: {
        click: () => {
          console.log('Edit profile btn click')
        }
      }
    })
    this.children.EditPasswordButton = new Button({
      label: 'Изменить пароль',
      styles: 'btn btn_regular btn_secondary',
      events: {
        click: () => {
          console.log('Edit password btn click')
        }
      }
    })
    this.children.LogoutButton = new Button({
      label: 'Выйти',
      styles: 'btn btn_regular btn_light',
      events: {
        click: () => {
          console.log('Logout btn click')
        }
      }
    })

    this.children.GoBackButton = new Button({
      styles: 'btn btn_icon btn_primary btn_round-full',
      icon: new IconArrowBack({ styles: 'btn-icon btn-icon_white' }),
      events: {
        click: () => {
          renderDom('#root', 'home')
        }
      }
    })
    
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
