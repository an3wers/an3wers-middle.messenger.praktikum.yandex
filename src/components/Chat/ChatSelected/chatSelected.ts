import Block from "../../../core/block.ts";
import { ChatSelectedFooter } from "../ChatSelectedFooter/chatSelectedFooter.ts";
import { ChatSelectedHeader } from "../ChatSelectedHeader/chatSelectedHeader.ts";
import template from './template.hbs'
import img from '../../../../static/images/mock-chat.jpg'
import { IconCheck } from "../../UI/Icons/14/Check/iconCheck.ts";

interface ChatSelectedProps {
    img?: string
}

export class ChatSelected extends Block {

    constructor(props: ChatSelectedProps) {
        super(props)
    }

    protected init(): void {
        this.children.ChatHeader = new ChatSelectedHeader({name: 'Илья'})
        this.children.ChatFooter = new ChatSelectedFooter({})
        this.children.CheckIcon = new IconCheck({ styles: 'feed-item__icon-check'})
    }

    protected render(): DocumentFragment {

        return this.compile(template, {img})
    }
}