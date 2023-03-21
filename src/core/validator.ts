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
  password_to: 'Пароли должны совпадать и быть от 8 до 40 символов',
  first_name:
    'Имя должно быть на латинице или кириллице, первая буква заглавная, без пробелов и цифр',
  second_name:
    'Фамилия должна быть на латинице или кириллице, первая буква заглавная, без пробелов и цифр',
  phone: 'Введите номер телефона правильно',
  email: 'Введите email правильно',
  display_name:
    'Имя в чате должно быть от 3 до 20 символов на латинице или кириллице',
  password_old: 'Поле не должно быть пустым',
  chat_title: 'Поле не должно быть пустым'
}

export default function useValidate(values: ValidateValues) {
  const errors: { [key: string]: string } = {}

  if (Array.isArray(values)) {
    // [{value: '', type: ''}, {value: '', type: ''}]
    values.forEach(el => {
      if (!validateValue(el.value, el.type)) {
        errors[el.type] = ERROR_MESSAGES[el.type]
      }
    })
  } else {
    if (!validateValue(values.value, values.type)) {
      errors[values.type] = ERROR_MESSAGES[values.type]
    }
  }
  return errors
}

function validateValue(value: string, type: string) {
  switch (type) {
    case 'login':
      return (
        /^[0-9a-zA-Z_-]{3,20}$/.test(value) &&
        (value.match(/[a-z]/g) || []).length
      )

    case 'password':
    case 'password_to':
    case 'password_old':
      return (
        /^[0-9a-zA-Z_-]{8,40}$/.test(value) &&
        (value.match(/[A-Z]/g) || []).length &&
        (value.match(/[0-9]/g) || []).length
      )

    case 'email':
      return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value)

    case 'first_name':
    case 'second_name':
      return /^[A-ZА-ЯЁ]{0,1}[a-zа-яё\\-]+$/.test(value)

    case 'phone':
      return /^((8|\+7)[\\-]?)?(\(?\d{3}\)?[\\-]?)?[\d\\-]{7,10}$/.test(value)

    case 'display_name':
      return /^[0-9a-zA-Zа-яёА-ЯЁ_-]{3,20}$/.test(value)

    case 'chat_title':
      return !!value.length
    default:
      return true
  }
}
