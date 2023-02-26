import { SigninForm } from '../../components/Signin/Form/signInForm.ts'
import Block from '../../core/block.ts'
import template from './template.hbs'

export class SigninPage extends Block {
  protected init(): void {
    this.children.Form = new SigninForm()
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
