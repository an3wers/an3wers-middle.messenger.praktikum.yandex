import Block from '../../../core/block'
// import { renderDom } from '../../../core/renderDom'
import { Button } from '../../UI/Button/button'
import { Input } from '../../UI/Input/input'
import { TextField } from '../../UI/TextField/textField'
import template from './template.hbs'
import useValidate from '../../../core/validator'
import { ErrorMessage } from '../../UI/ErrorMessage/errorMessage'
import { Link } from '../../UI/Link/link'
import { Routes } from '../../../app'
import authController from '../../../controllers/authController'
import { SignupData } from '../../../api/types/authTypes'

export class SignupForm extends Block {
  errors: { [key: string]: string }

  constructor() {
    super()
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
          focus: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.EmailField as Block
              )
            }
          },
          blur: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.EmailField as Block
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
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
          focus: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.LoginField as Block
              )
            }
          },
          blur: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.LoginField as Block
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
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
          focus: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.FirstNameField as Block
              )
            }
          },
          blur: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.FirstNameField as Block
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
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
          focus: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.SecondNameField as Block
              )
            }
          },
          blur: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.SecondNameField as Block
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
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
          focus: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.PhoneField as Block
              )
            }
          },
          blur: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.PhoneField as Block
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
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
          focus: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.PasswordField as Block
              )
            }
          },
          blur: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.PasswordField as Block
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
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
          focus: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.PasswordToField as Block
              )
            }
          },
          blur: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.PasswordToField as Block
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })

    this.children.RigisterButton = new Button({
      styles: 'btn btn_regular btn_primary',
      label: 'Зарегистрироваться',
      type: 'submit',
      events: {
        click: e => {
          e!.preventDefault()
          const data = {} as { [key: string]: string }

          const filedsArray = Object.entries(this.children).filter(el =>
            el[0].includes('Field')
          )

          filedsArray.forEach(([_, val]) => {
            if (!Array.isArray(val)) {
              const { value, name } = (
                val.children.input as Block
              ).getContent() as HTMLInputElement

              this.validateHandler(value, val)

              data[name] = value
            }
          })

          this.validatePasswordValues(data['password'], data['password_to'])

          if (!Object.keys(this.errors).length) {
            // eslint-disable-next-line camelcase
            const { password_to, ...signupData } = data

            authController.signup(signupData as unknown as SignupData)
          }
        }
      }
    })
    this.children.AuthButton = new Link({
      to: Routes.Index,
      styles: 'btn btn_regular btn_link',
      label: 'Войти'
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

  private validatePasswordValues(pswOne: string, pswTwo: string) {
    if (pswOne !== pswTwo) {
      this.errors['password_to'] = 'Пароли должны совпадать'
      ;(
        (this.children.PasswordToField as Block).children.error as Block
      ).setProps({
        text: this.errors['password_to']
      })
    } else {
      ;(
        (this.children.PasswordToField as Block).children.error as Block
      ).setProps({
        text: null
      })
      delete this.errors['password_to']
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
