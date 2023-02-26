import { SignupForm } from "../../components/Signup/Form/signupForm.ts";
import Block from "../../core/block.ts";
import template from './template.hbs'

export class SignupPage extends Block {

    protected init(): void {
        this.children.Form = new SignupForm()
    }

    protected render(): DocumentFragment {
        return this.compile(template, {})
    }
}