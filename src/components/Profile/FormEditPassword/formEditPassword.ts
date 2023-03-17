import userController from '../../../controllers/userController'
import Block from '../../../core/block'
import useValidate from '../../../core/validator'
import { Button } from '../../UI/Button/button'
import { ErrorMessage } from '../../UI/ErrorMessage/errorMessage'
import { Input } from '../../UI/Input/input'
import { TextField } from '../../UI/TextField/textField'
import template from './template.hbs'

interface FormEditPasswordProps {
  closeHandler: (value: string) => void
  switchHadler: (value: string) => void
}

export class FormEditPassword extends Block<FormEditPasswordProps> {
  errors: { [key: string]: string }
  constructor(props: FormEditPasswordProps) {
    super(props)
    this.errors = {}
  }

  protected init(): void {
    this.children.PasswordOldField = new TextField({
      for: 'password-old-profile-modal',
      label: 'Старый пароль',
      input: new Input({
        name: 'password_old',
        id: 'password-old-profile-modal',
        styles: 'form-element',
        type: 'password',
        placeholder: '••••••••••',
        events: {
          focus: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.PasswordOldField as Block
              )
            }
          },
          blur: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.PasswordOldField as Block
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })

    this.children.PasswordField = new TextField({
      for: 'password-profile-modal',
      label: 'Новый пароль',
      input: new Input({
        name: 'password',
        id: 'password-profile-modal',
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
      for: 'password-to-profile-modal',
      label: 'Пароль (еще раз)',
      input: new Input({
        name: 'password_to',
        id: 'password-to-profile-modal',
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

    this.children.SaveButton = new Button({
      styles: 'btn btn_regular btn_primary',
      label: 'Сохранить',
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
            const { password_to, ...reqData } = data
            userController.changePassword({
              oldPassword: reqData.password_old,
              newPassword: reqData.password
            })
            this.props.switchHadler('ModalPassword')

            // Очищаю value
            filedsArray.forEach(([_, val]) => {
              if (!Array.isArray(val)) {
                ;(
                  (val.children.input as Block).getContent() as HTMLInputElement
                ).value = ''
              }
            })
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
