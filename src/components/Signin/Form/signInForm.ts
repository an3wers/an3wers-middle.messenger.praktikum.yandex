import Block from '../../../core/block'
import template from './temaplet.hbs'
import { Button } from '../../UI/Button/button'
import { TextField } from '../../UI/TextField/textField'
import { Input } from '../../UI/Input/input'
import { ErrorMessage } from '../../UI/ErrorMessage/errorMessage'
import useValidate from '../../../core/validator'
import { Link } from '../../UI/Link/link'
import { Routes } from '../../../app'
import authController from '../../../controllers/authController'
import { SigninData } from '../../../api/types/authTypes'

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
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.LoginField
              )
            }
          },
          blur: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.LoginField
              )
            }
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
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.PasswordField
              )
            }
          },
          blur: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.PasswordField
              )
            }
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
        click: e => {
          e!.preventDefault()

          const data = {} as SigninData

          const filedsArray = Object.entries(this.children).filter(el =>
            el[0].includes('Field')
          )

          filedsArray.forEach(el => {
            const { value } = (
              el[1].children.input.getContent() as HTMLInputElement
            )
            const { name } =
              el[1].children.input.getContent() as HTMLInputElement

            this.validateHandler(value, el[1])

            data[name as keyof SigninData] = value
          })

          if (!Object.keys(this.errors).length) {
            
            // Вызываем контроллер, который будет дергать api
            console.log(data)
            authController.singin(data)
            
            filedsArray.forEach(el => {
              ;(el[1].children.input.getContent() as HTMLInputElement).value =
                ''
            })
          }
        }
      }
    })
    this.children.RegisterButton = new Link({
      styles: 'btn btn_regular btn_link',
      label: 'Нет аккаунта?',
      to: Routes.Signup
    })
  }

  private getValue(name: string) {
    return (
      this.element!.querySelector(`input[name=${name}]`) as HTMLInputElement
    ).value
  }

  private validateHandler(value: string, field: Block) {
    const { name } = field.children.input.getContent() as HTMLInputElement
    const error = useValidate({ value, type: name })
    if (Object.keys(error).length) {
      this.errors[name] = error[name]
      field.children.error.setProps({ text: error[name] })
    } else {
      field.children.error.setProps({ text: null })
      delete this.errors[name]
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
