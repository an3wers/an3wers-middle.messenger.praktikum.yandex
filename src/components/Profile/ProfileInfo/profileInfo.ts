import Block from '../../../core/block.ts'
import { Profile } from '../types.ts'
import template from './template.hbs'

interface ProfileInfoProps {
    profileData: Profile[]
}

export class ProfileInfo extends Block {
    constructor(props: ProfileInfoProps) {
        super(props)
    }
    protected render(): DocumentFragment {
        return this.compile(template, {profileData: this.props.profileData})
    }
}