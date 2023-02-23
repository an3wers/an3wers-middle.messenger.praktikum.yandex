import Block from '../../../core/block.ts'
import { Button } from '../../UI/Button/button.ts'
import { IconFile } from '../../UI/Icons/20/File/iconFile.ts'
import { IconLocation } from '../../UI/Icons/20/Location/iconLocation.ts'
import { IconPhotoFile } from '../../UI/Icons/20/PhotoFile/iconPhotoFile.ts'
import { IconArrowForward } from '../../UI/Icons/24/ArrowForward/iconArrowForward.ts'
import { IconAttach } from '../../UI/Icons/24/Attach/iconAttach.ts'
import { Input } from '../../UI/Input/input.ts'
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
    this.children.SendButton = new Button({
      styles: 'btn btn_primary btn_icon btn_round-full',
      icon: new IconArrowForward({
        styles: 'btn-icon btn-icon_white'
      })
    })
    this.children.ChatInput = new Input({
      styles: 'form-element form-element_round-full',
      placeholder: 'Сообщение',
      type: 'text'
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
