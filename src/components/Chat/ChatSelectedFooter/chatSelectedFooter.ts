import Block from '../../../core/block'
import { Button } from '../../UI/Button/button'
import { IconFile } from '../../UI/Icons/20/File/iconFile'
import { IconLocation } from '../../UI/Icons/20/Location/iconLocation'
import { IconPhotoFile } from '../../UI/Icons/20/PhotoFile/iconPhotoFile'
import { IconAttach } from '../../UI/Icons/24/Attach/iconAttach'
import { ChatSelectedForm } from '../ChatSelectedForm/chatSelectedForm'
import template from './template.hbs'

export class ChatSelectedFooter extends Block {
  protected init(): void {
    this.children.AttachDropdownButton = new Button({
      icon: new IconAttach({ styles: 'btn-icon btn-icon_light' }),
      styles: 'btn btn_icon btn_light'
    })
    this.children.AttachMeadiButton = new Button({
      label: 'Фото или видео',
      styles: 'dropdown__item btn btn_small btn_link',
      icon: new IconPhotoFile({
        styles: 'btn-icon btn-icon_dark'
      })
    })
    this.children.AttachFileButton = new Button({
      label: 'Файл',
      styles: 'dropdown__item btn btn_small btn_link',
      icon: new IconFile({
        styles: 'btn-icon btn-icon_dark'
      })
    })
    this.children.AttachLocationButton = new Button({
      label: 'Локация',
      styles: 'dropdown__item btn btn_small btn_link',
      icon: new IconLocation({
        styles: 'btn-icon btn-icon_dark'
      })
    })

    this.children.ChatForm = new ChatSelectedForm({})
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
