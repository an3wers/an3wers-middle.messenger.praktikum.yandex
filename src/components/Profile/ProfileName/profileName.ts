import Block from "../../../core/block";
import template from './template.hbs'

interface ProfileNameProps {
    name: string
}

export class ProfileName extends Block {
    constructor(props: ProfileNameProps) {
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
