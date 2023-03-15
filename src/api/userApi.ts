import BaseAPI from './baseApi'
import { ChangePasswordData, ChangeProfileData } from './types/userTypes'

class UserAPI extends BaseAPI {
  constructor() {
    super('/user')
  }

  changeProfile(data: ChangeProfileData) {
    return this.http.put('/profile', { data })
  }

  changeAvatar(data: FormData) {
    return this.http.put('/profile/avatar', { data })
  }

  changePassword(data: ChangePasswordData) {
    return this.http.put('/password', { data })
  }

  create = undefined
  read = undefined
  update = undefined
  delete = undefined
}

export default UserAPI
