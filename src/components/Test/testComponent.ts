import Block from '../../core/block.ts'
import template from './template.hbs'

export class TestComponent extends Block {
    constructor(props) {
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}