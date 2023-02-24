import Block from "../../core/block.ts";
import template from './temaplate.hbs'

class Navigation extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, {})
    }
}