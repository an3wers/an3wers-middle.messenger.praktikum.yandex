import { Button } from '../../components/UI/Button/button'
import { IconArrowBack } from '../../components/UI/Icons/20/ArrowBack/iconArrowBack'
import Block from '../../core/block'
import template from './template.hbs'
import { renderDom } from '../../core/renderDom'
import { ProfileName } from '../../components/Profile/ProfileName/profileName'
import { ProfileAvatar } from '../../components/Profile/ProfileAvatar/profileAvatar'
import avatar from '../../../static/images/default-avatar-profile.jpg'
import profileData from '../../markup/data/userProfile.js'
import { ProfileInfo } from '../../components/Profile/ProfileInfo/profileInfo'
import { Modal } from '../../components/UI/Modal/modal'
import { FormEditProfile } from '../../components/Profile/FormEditInfo/formEditInfo'
import { FormEditPassword } from '../../components/Profile/FormEditPassword/formEditPassword'
import { Navigation } from '../../components/Navigation/navigation'

export class ProfilePage extends Block {
  protected init(): void {
    this.children.Navigation = new Navigation({})
    this.children.ProfileAvatar = new ProfileAvatar({ avatar })

    this.children.ProfileName = new ProfileName({ name: 'Иван' })

    this.children.ProfileInfo = new ProfileInfo({ profileData })

    this.children.EditProfileButton = new Button({
      label: 'Изменить данные',
      styles: 'btn btn_regular btn_secondary',
      events: {
        click: () => {
          this.children.ModalProfile.show()
        }
      }
    })
    this.children.EditPasswordButton = new Button({
      label: 'Изменить пароль',
      styles: 'btn btn_regular btn_secondary',
      events: {
        click: () => {
          this.children.ModalPassword.show()
        }
      }
    })
    this.children.LogoutButton = new Button({
      label: 'Выйти',
      styles: 'btn btn_regular btn_light',
      events: {
        click: () => {
          renderDom('#root', 'signin')
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

    this.children.ModalProfile = new Modal({
      title: 'Изменить данные',
      body: new FormEditProfile({
        profileData,
        closeHandler: this.closeModal.bind(this)
      })
    })

    this.children.ModalPassword = new Modal({
      title: 'Изменить пароль',
      body: new FormEditPassword({
        closeHandler: this.closeModal.bind(this)
      })
    })
  }

  protected closeModal(modal: string) {
    this.children[modal].hide()
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
