import userController from '../../../controllers/userController'
import Block from '../../../core/block'
import { Button } from '../../UI/Button/button'
import { Input } from '../../UI/Input/input'
import template from './template.hbs'

interface FormChangeAvatarProps {
  closeHandler: (value: string) => void
  switchHadler: (value: string) => void
}

export class FormChangeAvatar extends Block<FormChangeAvatarProps> {
  constructor(props: FormChangeAvatarProps) {
    super(props)
  }

  protected init(): void {
    this.children.InputFile = new Input({
      name: 'avatar',
      id: 'avatar-profile-modal',
      styles: 'form-element',
      type: 'file'
    })

    this.children.SaveButton = new Button({
      styles: 'btn btn_regular btn_primary',
      label: 'Применить',
      type: 'submit',
      events: {
        click: e => {
          e!.preventDefault()

          const inputEL =
            this.children.InputFile.getContent() as HTMLInputElement

          const { files } = inputEL

          if (files?.length) {
            this.sendForm(files[0])
            this.props.switchHadler('ModalChangeAvatar')
            inputEL.value = ''
          }
        }
      }
    })
  }

  sendForm(file: File) {
    const data = new FormData()
    data.append('avatar', file)

    userController.changeAvatar(data)
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
