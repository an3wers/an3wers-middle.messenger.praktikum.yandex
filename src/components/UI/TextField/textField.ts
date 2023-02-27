import Block from '../../../core/block'
import template from './template.hbs'

interface TextFieldProps {
    label: string,
    for: string,
    error?: string | null,
    input: Block
}

export class TextField extends Block {

    constructor(props: TextFieldProps) {
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
