import Block from '../../../core/block'
import { withStore } from '../../../core/store'
import template from './template.hbs'
import defaultAvatar from '../../../../static/images/default-avatar-profile.jpg'

interface ProfileAvatarProps {
  avatar?: string
  events: {
    [key: string]: (e: Event | undefined) => void
  }
}

export class ProfileAvatarBase extends Block<ProfileAvatarProps> {
  constructor(props: ProfileAvatarProps) {
    super(props)
  }

  protected render(): DocumentFragment {
    return this.compile(template, {
      avatar: this.props.avatar
    })
  }
}

const withUserAvatar = withStore(state => {
  return {
    avatar: state.user?.data?.avatar
      ? `https://ya-praktikum.tech/api/v2/resources${state.user.data.avatar}`
      : defaultAvatar
  }
})
export const ProfileAvatar = withUserAvatar(ProfileAvatarBase)
