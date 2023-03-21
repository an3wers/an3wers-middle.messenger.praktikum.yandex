import chatsController from '../../../controllers/chatsController'
import Block from '../../../core/block'
import useValidate from '../../../core/validator'
import { Button } from '../../UI/Button/button'
import { ErrorMessage } from '../../UI/ErrorMessage/errorMessage'
import { Input } from '../../UI/Input/input'
import { TextField } from '../../UI/TextField/textField'
import template from './template.hbs'

interface ChatRemoveUserFormProps {
  closeHandler: (value: string) => void
  switchHadler: (value: string) => void
}

export class ChatRemoveUserForm extends Block<ChatRemoveUserFormProps> {
  errors: { [key: string]: string }
  constructor(props: ChatRemoveUserFormProps) {
    super(props)
    this.errors = {}
  }

  protected init(): void {
    this.children.ChatUsernameField = new TextField({
      for: 'chat-user-login',
      label: 'Логин',
      input: new Input({
        name: 'login',
        id: 'chat-user-login',
        styles: 'form-element',
        type: 'text',
        placeholder: 'Введите логин',
        events: {
          blur: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.ChatUsernameField as Block
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })
    this.children.SaveButton = new Button({
      styles: 'btn btn_regular btn_primary',
      label: 'Удалить',
      type: 'submit',
      events: {
        click: e => {
          e!.preventDefault()

          const data = {} as { [key: string]: string }
          const inputEl = (
            (this.children.ChatUsernameField as Block).children.input as Block
          ).getContent() as HTMLInputElement

          const { value, name } = inputEl

          this.validateHandler(value, this.children.ChatUsernameField as Block)
          data[name] = value

          if (!Object.keys(this.errors).length) {
            console.log('Delete user', data)
            chatsController.removeUsersFromChat({ login: data.login })
            this.props.switchHadler('ModalRemoverUser')
            inputEl.value = ''
          }
        }
      }
    })
  }

  private getValue(name: string) {
    return (
      this.element!.querySelector(`input[name=${name}]`) as HTMLInputElement
    ).value
  }

  private validateHandler(value: string, field: Block) {
    const { name } = (
      field.children.input as Block
    ).getContent() as HTMLInputElement

    const err = useValidate({ value, type: name })
    if (Object.keys(err).length) {
      this.errors[name] = err[name]
      ;(field.children.error as Block).setProps({ text: err[name] })
    } else {
      ;(field.children.error as Block).setProps({ text: null })
      delete this.errors[name]
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
