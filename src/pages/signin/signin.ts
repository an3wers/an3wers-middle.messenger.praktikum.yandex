import { SigninForm } from '../../components/Signin/Form/signInForm'
import Block from '../../core/block'
import template from './template.hbs'

export class SigninPage extends Block {
  protected init(): void {
    this.children.Form = new SigninForm()
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
