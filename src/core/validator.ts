// const enum formsNames {
//   'LOGIN' = 'login',
//   'PASSWORD' = 'password',
//   'FIRST_NAME' = 'password',
//   'SECOND_NAME' = 'password',
//   'PHONE' = 'password'
// }

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
  first_name: '',
  second_name: '',
  phone: ''
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
        if (value.length < 3 || value.length > 20) {
          this.errors[type] = ERROR_MESSAGES[type]
        } else {
          delete this.errors[type]
        }
        break

      case 'password':
        if (value.length < 3 || value.length > 20) {
          this.errors[type] = ERROR_MESSAGES[type]
        } else {
          delete this.errors[type]
        }
        break
      case 'email':
        break
      case 'first_name':
      case 'second_name':
        break

      case 'phone':
        break

      case 'message':
        break
      default:
        this.errors = {}
        break
    }
  }
}
