import Block from '../../../core/block'
import useValidate from '../../../core/validator'
import { Button } from '../../UI/Button/button'
import { ErrorMessage } from '../../UI/ErrorMessage/errorMessage'
import { Input } from '../../UI/Input/input'
import { TextField } from '../../UI/TextField/textField'
import template from './template.hbs'

interface ChatCreateFormProps {
  closeHandler: (value: string) => void
  switchHadler: (value: string) => void
}

export class ChatCreateForm extends Block<ChatCreateFormProps> {
  errors: { [key: string]: string }
  constructor(props: ChatCreateFormProps) {
    super(props)
    this.errors = {}
  }

  protected init(): void {
    this.children.ChatTitleField = new TextField({
      for: 'chat-title',
      label: 'Название',
      input: new Input({
        name: 'chat_title',
        id: 'chat-title',
        styles: 'form-element',
        type: 'text',
        placeholder: 'Введите название',
        events: {
          blur: e => {
            if (e) {
              const { name } = e.target as HTMLInputElement
              this.validateHandler(
                this.getValue(name),
                this.children.ChatTitleField
              )
            }
          }
        }
      }),
      error: new ErrorMessage({ text: null })
    })
    this.children.SaveButton = new Button({
      styles: 'btn btn_regular btn_primary',
      label: 'Добавить',
      type: 'submit',
      events: {
        click: e => {
          e!.preventDefault()

          const data = {} as { [key: string]: string }
          const inputEl =
            this.children.ChatTitleField.children.input.getContent() as HTMLInputElement

          const { value, name } = inputEl

          this.validateHandler(value, this.children.ChatTitleField)
          data[name] = value

          if (!Object.keys(this.errors).length) {
            console.log(data)

            // this.props.switchHadler('ModalCreateChat')

            // Очищаю value
            inputEl.value = ''
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
    return this.compile(template, this.props)
  }
}
