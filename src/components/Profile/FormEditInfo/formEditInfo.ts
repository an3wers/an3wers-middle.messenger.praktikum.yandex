import Block from '../../../core/block'
import useValidate from '../../../core/validator'
import { Button } from '../../UI/Button/button'
import { ErrorMessage } from '../../UI/ErrorMessage/errorMessage'
import { Input } from '../../UI/Input/input'
import { TextField } from '../../UI/TextField/textField'
import { Profile } from '../types'
import template from './template.hbs'

interface FormEditProfileProps {
  profileData: Profile[],
  closeHandler: (value: string) => void
}

export class FormEditProfile extends Block<FormEditProfileProps> {
  errors: { [key: string]: string }
  constructor(props: FormEditProfileProps) {
    super(props)
    this.errors = {}
  }

  protected init(): void {
    this.children.EmailField = new TextField({
      for: 'email-profile-modal',
      label: 'Почта',
      input: new Input({
        name: 'email',
        id: 'email-profile-modal',
        styles: 'form-element',
        type: 'email',
        placeholder: 'Введите вашу почту',
        value: this.getValueByFiledName('email'),
        events: {
          focus: e => {
            const name = (e.target as HTMLInputElement).name
            this.validateHandler(this.getValue(name), this.children.EmailField)
          },
          blur: e => {
            const name = (e.target as HTMLInputElement).name
            this.validateHandler(this.getValue(name), this.children.EmailField)
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })

    this.children.LoginField = new TextField({
      for: 'login-profile-modal',
      label: 'Логин',
      input: new Input({
        name: 'login',
        id: 'login-profile-modal',
        styles: 'form-element',
        type: 'text',
        placeholder: 'Придумайте логин',
        value: this.getValueByFiledName('login'),
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

    this.children.FirstNameField = new TextField({
      for: 'first-name-profile-modal',
      label: 'Имя',
      input: new Input({
        name: 'first_name',
        id: 'first-name-profile-modal',
        styles: 'form-element',
        type: 'text',
        placeholder: 'Введите ваше имя',
        value: this.getValueByFiledName('first_name'),
        events: {
          focus: e => {
            const name = (e.target as HTMLInputElement).name
            this.validateHandler(
              this.getValue(name),
              this.children.FirstNameField
            )
          },
          blur: e => {
            const name = (e.target as HTMLInputElement).name
            this.validateHandler(
              this.getValue(name),
              this.children.FirstNameField
            )
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })

    this.children.SecondNameField = new TextField({
      for: 'second-name-profile-modal',
      label: 'Фамилия',
      input: new Input({
        name: 'second_name',
        id: 'second-name-profile-modal',
        styles: 'form-element',
        type: 'text',
        placeholder: 'Введите вашу фамилию',
        value: this.getValueByFiledName('second_name'),
        events: {
          focus: e => {
            const name = (e.target as HTMLInputElement).name
            this.validateHandler(
              this.getValue(name),
              this.children.SecondNameField
            )
          },
          blur: e => {
            const name = (e.target as HTMLInputElement).name
            this.validateHandler(
              this.getValue(name),
              this.children.SecondNameField
            )
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })

    this.children.DisplayNameField = new TextField({
      for: 'display-name-profile-modal',
      label: 'Имя в чате',
      input: new Input({
        name: 'display_name',
        id: 'display-name-profile-modal',
        styles: 'form-element',
        type: 'text',
        value: this.getValueByFiledName('display_name'),
        placeholder: 'Введите ваше имя в чате',
        events: {
          focus: e => {
            const name = (e.target as HTMLInputElement).name
            this.validateHandler(
              this.getValue(name),
              this.children.SecondNameField
            )
          },
          blur: e => {
            const name = (e.target as HTMLInputElement).name
            this.validateHandler(
              this.getValue(name),
              this.children.SecondNameField
            )
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })

    this.children.PhoneField = new TextField({
      for: 'phone-profile-modal',
      label: 'Телефон',
      input: new Input({
        name: 'phone',
        id: 'phone-profile-modal',
        styles: 'form-element',
        type: 'tel',
        placeholder: 'Например: +7(999)123-45-67',
        value: this.getValueByFiledName('phone'),
        events: {
          focus: e => {
            const name = (e.target as HTMLInputElement).name
            this.validateHandler(this.getValue(name), this.children.PhoneField)
          },
          blur: e => {
            const name = (e.target as HTMLInputElement).name
            this.validateHandler(this.getValue(name), this.children.PhoneField)
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
        click: (e: Event) => {
          e.preventDefault()

          const data = {}

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
            this.props.closeHandler('ModalProfile')
          }
        }
      }
    })
  }

  private getValueByFiledName(name: string) {
    return this.props.profileData.find(el => el.name === name).value ?? ''
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
