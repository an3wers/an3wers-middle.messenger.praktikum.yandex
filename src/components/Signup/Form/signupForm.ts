import Block from '../../../core/block.ts'
import { renderDom } from '../../../core/router.ts'
import { Button } from '../../UI/Button/button.ts'
import { Input } from '../../UI/Input/input.ts'
import { TextField } from '../../UI/TextField/textField.ts'
import template from './template.hbs'

export class SignupForm extends Block {
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
          blur: () => {}
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
          blur: () => {}
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
          blur: () => {}
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
          blur: () => {}
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
        placeholder: 'Например: +7 (999) 123-45-67',
        events: {
          blur: () => {}
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
          blur: () => {}
        }
      })
    })

    this.children.PasswordToField = new TextField({
      for: 'password-to-signup',
      label: 'Пароль (еще раз)',
      input: new Input({
        name: 'password-to',
        id: 'password-to-signup',
        styles: 'form-element',
        type: 'password',
        placeholder: '••••••••••',
        events: {
          blur: () => {}
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

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
