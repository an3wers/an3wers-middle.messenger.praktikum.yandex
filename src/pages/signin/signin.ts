import { Navigation } from '../../components/Navigation/navigation'
import { SigninForm } from '../../components/Signin/Form/signInForm'
import Block from '../../core/block'
import template from './template.hbs'

export class SigninPage extends Block {
  protected init(): void {
    this.children.Navigation = new Navigation({})
    this.children.Form = new SigninForm()
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
