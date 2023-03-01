import { Navigation } from '../../components/Navigation/navigation'
import { SignupForm } from '../../components/Signup/Form/signupForm'
import Block from '../../core/block'
import template from './template.hbs'

export class SignupPage extends Block {
  protected init(): void {
    this.children.Navigation = new Navigation({})
    this.children.Form = new SignupForm()
  }

  protected render(): DocumentFragment {
    return this.compile(template, {})
  }
}
