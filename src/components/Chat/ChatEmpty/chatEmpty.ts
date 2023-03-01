import Block from '../../../core/block'
import template from './template.hbs'

export class ChatEmpty extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, {})
    }    
}