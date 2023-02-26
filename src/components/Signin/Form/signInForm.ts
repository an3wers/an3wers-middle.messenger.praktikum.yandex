import Block from '../../../core/block.ts'
import template from './temaplet.hbs'
import { Button } from '../../UI/Button/button.ts'
import { TextField } from '../../UI/TextField/textField.ts'
import { Input } from '../../UI/Input/input.ts'
import { Validator } from '../../../core/validator.ts'
import { renderDom } from '../../../core/router.ts'


export class SigninForm extends Block {
  private validator: Validator
  errors: { [key: string]: string }
  constructor() {
    super()
    this.validator = new Validator()
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
          blur: () => {
            const currInput =
              this.children.LoginField.children.input.getContent() as HTMLInputElement
            this.validateHandler(currInput, this.children.LoginField)
          }
        }
      }),
      error: null
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
          blur: () => {
            const currInput =
              this.children.PasswordField.children.input.getContent() as HTMLInputElement
            this.validateHandler(currInput, this.children.PasswordField)
          }
        }
      }),
      error: null
    })

    this.children.AuthButton = new Button({
      styles: 'btn btn_regular btn_primary',
      label: 'Авторизоваться',
      type: 'submit',
      events: {
        click: (e: Event) => {
          e.preventDefault()

          const login =
            this.children.LoginField.children.input.getContent() as HTMLInputElement
          const password =
            this.children.PasswordField.children.input.getContent() as HTMLInputElement

          const filedsArray = Object.entries(this.children).filter(el =>
            el[0].includes('Field')
          )

          filedsArray.forEach(el => {
            this.validateHandler(
              el[1].children.input.getContent() as HTMLInputElement,
              el[1]
            )
          })

          if (!Object.keys(this.errors).length) {
            // console.log('форму можно отправлять')
            console.log({ login: login.value, password: password.value })
            login.value = ''
            password.value = ''
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

  protected validateHandler(node: HTMLInputElement, field: Block) {
    const filedName = (field.children.input.getContent() as HTMLInputElement)
      .name

    const errorContainer = field
      .getContent()
      .querySelector('.field-group__error-message')

    const errors = this.validator.validateValue({
      value: node.value,
      type: filedName
    })

    if (filedName in errors) {
      errorContainer.classList.remove('hidden')
      errorContainer.textContent = errors[filedName]

      node.classList.add('form-element_error')
    } else {
      errorContainer.classList.add('hidden')
      errorContainer.textContent = ''
      node.classList.remove('form-element_error')
    }
    this.errors = errors
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
