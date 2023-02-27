type Value = {
  value: string
  type: string
}

type ValidateValues = Value | Value[]

const ERROR_MESSAGES: { [key: string]: string } = {
  login:
    'Логин должен быть от 3 до 20 символов на латинице, без пробелов, без спецсимволов, может содержать цифры',
  password:
    'Пароль должен быть от 8 до 40 символов, обязательно одна заглавная буква и цифра',
  password_to:
    'Пароли должны совпадать и быть от 8 до 40 символов',
  first_name:
    'Имя должно быть на латинице или кириллице, первая буква заглавная, без пробелов и цифр',
  second_name:
    'Фамилия должна быть на латинице или кириллице, первая буква заглавная, без пробелов и цифр',
  phone: 'Введите номер телефона правильно',
  email: 'Введите email правильно'
}

export class Validator {
  private errors: {
    [key: string]: string
  }

  constructor() {
    this.errors = {}
  }

  public validateValue(values: ValidateValues) {
    if (Array.isArray(values)) {
      // [{value: '', type: ''}, {value: '', type: ''}]
      values.forEach(el => {
        this._validateValue(el.value, el.type)
      })
    } else {
      this._validateValue(values.value, values.type)
    }

    return this.errors
  }

  private _validateValue(value: string, type: string) {
    switch (type) {
      case 'login':
        if (
          /^[0-9a-zA-Z_-]{3,20}$/.test(value) &&
          (value.match(/[a-z]/g) || []).length
        ) {
          delete this.errors[type]
        } else {
          this.errors[type] = ERROR_MESSAGES[type]
        }
        break

      case 'password':
      case 'password_to':
        if (
          /^[0-9a-zA-Z_-]{8,40}$/.test(value) &&
          (value.match(/[A-Z]/g) || []).length &&
          (value.match(/[0-9]/g) || []).length
        ) {
          delete this.errors[type]
        } else {
          this.errors[type] = ERROR_MESSAGES[type]
        }
        break
      case 'email':
        if (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value)) {
          delete this.errors[type]
        } else {
          this.errors[type] = ERROR_MESSAGES[type]
        }

        break
      case 'first_name':
      case 'second_name':
        if (/^[A-ZА-Я]+[a-zа-я\\-]+$/.test(value)) {
          delete this.errors[type]
        } else {
          this.errors[type] = ERROR_MESSAGES[type]
        }
        break
      // case 'second_name':
      //   if (/^[A-ZА-Я]+[a-zа-я\\-]+$/.test(value)) {
      //     delete this.errors[type]
      //   } else {
      //     this.errors[type] = ERROR_MESSAGES[type]
      //   }
      //   break

      case 'phone':
        if (
          /^((8|\+7)[\\-]?)?(\(?\d{3}\)?[\\- ]?)?[\d\- ]{7,10}$/.test(value)
        ) {
          delete this.errors[type]
        } else {
          this.errors[type] = ERROR_MESSAGES[type]
        }
        break
      default:
        this.errors = {...this.errors}
        break
    }
  }
}
