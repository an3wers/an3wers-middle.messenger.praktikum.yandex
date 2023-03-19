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
      const res = (await this.api.signup(data)) as XMLHttpRequest

      if (res.status >= 400) {
        store.set('user.isError', res.response.reason)
      } else {
        await this.fetchUser()
        router.go(Routes.Messenger)
      }
    } catch (error) {
      console.log(error)
    }
  }
  async singin(data: SigninData) {
    try {
      const res = (await this.api.signin(data)) as XMLHttpRequest
      if (res.status >= 400) {
        store.set('user.isError', res.response.reason)
      } else {
        await this.fetchUser()
        router.go(Routes.Messenger)
      }
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
    const user = (await this.api.getUser()) as XMLHttpRequest

    if (user.status >= 400) {
      throw new Error(user.response.reason)
    } else {
      store.set('user.data', user.response)
    }

    // store.set('user.data', user.response)
    // try {
    //   const user = (await this.api.getUser()) as XMLHttpRequest

    //   if (user.status >= 400) {
    //     throw new Error(user.response.reason)
    //   } else {
    //     store.set('user.data', user.response)
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }
}

export default new AuthController()
