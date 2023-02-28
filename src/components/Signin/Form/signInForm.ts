import Block from '../../../core/block'
import template from './temaplet.hbs'
import { Button } from '../../UI/Button/button'
import { TextField } from '../../UI/TextField/textField'
import { Input } from '../../UI/Input/input'
import { renderDom } from '../../../core/router'
import { ErrorMessage } from '../../UI/ErrorMessage/errorMessage'
import useValidate from '../../../core/validator'

export class SigninForm extends Block {
  errors: { [key: string]: string }

  constructor() {
    super()
    this.errors = {}
  }

  protected init(): void {
    this.children.LoginField = new TextField({
      for: 'login-signin',
      label: 'Логин',
      input: new Input({
        name: 'login',
        id: 'login-signin',
        styles: 'form-element',
        type: 'text',
        placeholder: 'Введите ваш логин',
        events: {
          focus: e => {
            const name = (e.target as HTMLInputElement).name
            this.validateHandler(this.getValue(name), this.children.LoginField)
          },
          blur: e => {
            const name = (e.target as HTMLInputElement).name
            this.validateHandler(this.getValue(name), this.children.LoginField)
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })

    this.children.PasswordField = new TextField({
      for: 'password-signin',
      label: 'Пароль',
      input: new Input({
        name: 'password',
        id: 'password-signin',
        styles: 'form-element',
        type: 'password',
        placeholder: '••••••••••',
        events: {
          focus: e => {
            const name = (e.target as HTMLInputElement).name
            this.validateHandler(
              this.getValue(name),
              this.children.PasswordField
            )
          },
          blur: e => {
            const name = (e.target as HTMLInputElement).name
            this.validateHandler(
              this.getValue(name),
              this.children.PasswordField
            )
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })

    this.children.AuthButton = new Button({
      styles: 'btn btn_regular btn_primary',
      label: 'Авторизоваться',
      type: 'submit',
      events: {
        click: (e: Event) => {
          e.preventDefault()

          const data = {}

          // const login =
          //   this.children.LoginField.children.input.getContent() as HTMLInputElement
          // const password =
          //   this.children.PasswordField.children.input.getContent() as HTMLInputElement

          const filedsArray = Object.entries(this.children).filter(el =>
            el[0].includes('Field')
          )

          filedsArray.forEach(el => {
            const value = (
              el[1].children.input.getContent() as HTMLInputElement
            ).value
            const name = (el[1].children.input.getContent() as HTMLInputElement)
              .name

            this.validateHandler(value, el[1])

            data[name] = value
          })

          if (!Object.keys(this.errors).length) {
            console.log(data)
            filedsArray.forEach(
              el =>
                ((el[1].children.input.getContent() as HTMLInputElement).value =
                  '')
            )
            // login.value = ''
            // password.value = ''
          }
        }
      }
    })
    this.children.RegisterButton = new Button({
      styles: 'btn btn_regular btn_link',
      label: 'Нет аккаунта?',
      type: 'button',
      events: {
        click: () => {
          renderDom('#root', 'signup')
        }
      }
    })
  }

  private getValue(fieldName: string) {
    return (
      this.element.querySelector(`input[name=${fieldName}]`) as HTMLInputElement
    ).value
  }

  private validateHandler(value: string, field: Block) {
    const fieldName = (field.children.input.getContent() as HTMLInputElement)
      .name
    const error = useValidate({ value, type: fieldName })
    if (Object.keys(error).length) {
      this.errors[fieldName] = error[fieldName]
      field.children.error.setProps({ text: error[fieldName] })
    } else {
      field.children.error.setProps({ text: null })
      delete this.errors[fieldName]
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
