import AuthAPI from '../api/authApi'
import { SigninData, SignupData } from '../api/types/authTypes'
import { Routes } from '../app'
import router from '../core/router/router'
import store from '../core/store'

class AuthController {
  private api: AuthAPI

  constructor() {
    this.api = new AuthAPI()
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data)
      await this.fetchUser()
      router.go(Routes.Settings)
    } catch (error) {
      console.log(error)
    }
  }
  async singin(data: SigninData) {
    try {
      await this.api.signin(data)
      await this.fetchUser()
      router.go(Routes.Settings)
    } catch (error) {
      console.log(error)
    }
  }
  async logout() {
    try {
      await this.api.logout()
      store.set('user.data', undefined)
      router.go(Routes.Index)
    } catch (error) {
      console.log(error)
    }
  }
  async fetchUser() {
    const user = await this.api.getUser()
    console.log('User', user)
    store.set('user.data', user)
  }
}

export default new AuthController()
