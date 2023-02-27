import Block from '../../../core/block'
import { renderDom } from '../../../core/router'
import { Button } from '../../UI/Button/button'
import { Input } from '../../UI/Input/input'
import { TextField } from '../../UI/TextField/textField'
import { Validator } from '../../../core/validator'
import template from './template.hbs'

export class SignupForm extends Block {
  private validator: Validator
  errors: { [key: string]: string }

  constructor() {
    super()
    this.validator = new Validator()
    this.errors = {}
  }

  protected init(): void {
    this.children.EmailField = new TextField({
      for: 'email-signup',
      label: 'Почта',
      input: new Input({
        name: 'email',
        id: 'email-signup',
        styles: 'form-element',
        type: 'email',
        placeholder: 'Введите вашу почту',
        events: {
          blur: () => {
            const currInput =
              this.children.EmailField.children.input.getContent() as HTMLInputElement
            this.validateHandler(currInput, this.children.EmailField)
          }
        }
      })
    })

    this.children.LoginField = new TextField({
      for: 'login-signup',
      label: 'Логин',
      input: new Input({
        name: 'login',
        id: 'login-signup',
        styles: 'form-element',
        type: 'text',
        placeholder: 'Придумайте логин',
        events: {
          blur: () => {
            const currInput =
              this.children.LoginField.children.input.getContent() as HTMLInputElement
            this.validateHandler(currInput, this.children.LoginField)
          }
        }
      })
    })

    this.children.FirstNameField = new TextField({
      for: 'first-name-signup',
      label: 'Имя',
      input: new Input({
        name: 'first_name',
        id: 'first-name-signup',
        styles: 'form-element',
        type: 'text',
        placeholder: 'Введите ваше имя',
        events: {
          blur: () => {
            const currInput =
              this.children.FirstNameField.children.input.getContent() as HTMLInputElement
            this.validateHandler(currInput, this.children.FirstNameField)
          }
        }
      })
    })

    this.children.SecondNameField = new TextField({
      for: 'second-name-signup',
      label: 'Фамилия',
      input: new Input({
        name: 'second_name',
        id: 'second-name-signup',
        styles: 'form-element',
        type: 'text',
        placeholder: 'Введите вашу фамилию',
        events: {
          blur: () => {
            const currInput =
              this.children.SecondNameField.children.input.getContent() as HTMLInputElement
            this.validateHandler(currInput, this.children.SecondNameField)
          }
        }
      })
    })

    this.children.PhoneField = new TextField({
      for: 'phone-signup',
      label: 'Телефон',
      input: new Input({
        name: 'phone',
        id: 'phone-signup',
        styles: 'form-element',
        type: 'tel',
        placeholder: 'Например: +7(999)123-45-67',
        events: {
          blur: () => {
            const currInput =
              this.children.PhoneField.children.input.getContent() as HTMLInputElement
            this.validateHandler(currInput, this.children.PhoneField)
          }
        }
      })
    })

    this.children.PasswordField = new TextField({
      for: 'password-signup',
      label: 'Пароль',
      input: new Input({
        name: 'password',
        id: 'password-signup',
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
      })
    })

    this.children.PasswordToField = new TextField({
      for: 'password-to-signup',
      label: 'Пароль (еще раз)',
      input: new Input({
        name: 'password_to',
        id: 'password-to-signup',
        styles: 'form-element',
        type: 'password',
        placeholder: '••••••••••',
        events: {
          blur: () => {
            const currInput =
              this.children.PasswordToField.children.input.getContent() as HTMLInputElement
            this.validateHandler(currInput, this.children.PasswordToField)
          }
        }
      })
    })

    this.children.RigisterButton = new Button({
      styles: 'btn btn_regular btn_primary',
      label: 'Зарегистрироваться',
      type: 'submit',
      events: {
        click: (e: Event) => {
          e.preventDefault()
        }
      }
    })
    this.children.AuthButton = new Button({
      styles: 'btn btn_regular btn_link',
      label: 'Войти',
      type: 'button',
      events: {
        click: () => {
          renderDom('#root', 'signin')
        }
      }
    })
  }

  protected validateHandler(node: HTMLInputElement, field: Block) {
    const filedName = (field.children.input.getContent() as HTMLInputElement)
      .name

    // if(filedName === 'password-to') {
    //   if(node.value.length && (this.children.PasswordField.children.input.getContent() as HTMLInputElement).value === node.value) {

    //   } else {

    //   }
    // } else {
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
