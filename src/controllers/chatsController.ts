import ChatsAPI from '../api/chatsApi'
import { Chat, CreateChatData } from '../api/types/chatTypes'
import store from '../core/store'
import userController from './userController'
import MessagesController from './messagesController'
import { MessageType } from '../api/types/messagesTypes'

class ChatsController {
  private api: ChatsAPI

  constructor() {
    this.api = new ChatsAPI()
  }

  async getChats() {
    try {
      const res = (await this.api.getChats()) as XMLHttpRequest
      if (res.status >= 400) {
        store.set('chatList.isError', res.response.reason)
      } else {
        ;(res.response as Chat[]).map(async chat => {
          const token = await this.getToken(chat.id)

          await MessagesController.connect(chat.id, token)
        })

        store.set('chatList.data', res.response)
      }
    } catch (error) {
      console.error((error as Error).message)
    }
  }

  async createChat(data: CreateChatData) {
    try {
      const res = (await this.api.createChat(data)) as XMLHttpRequest

      if (res.status >= 400) {
        store.set('chatList.isError', res.response.reason)
      } else {
        await this.getChats()
      }
    } catch (error) {
      console.error((error as Error).message)
    }
  }

  async removeChat() {
    try {
      const chatId = store.getState().selectedChat
      const res = (await this.api.removeChat({ chatId })) as XMLHttpRequest

      if (res.status >= 400) {
        throw new Error(res.response.reason)
      } else {
        store.set('selectedChat', 0)
        await this.getChats()
      }
    } catch (error) {
      console.error((error as Error).message)
    }
  }

  selectChat(id: number) {
    store.set('selectedChat', id)
  }

  async addUsersToChat(data: { login: string }) {
    const reqData = await this.getUsersId(data)

    if (reqData) {
      await this.api.addUsersToChat(reqData)
    }
  }

  async removeUsersFromChat(data: { login: string }) {
    const reqData = await this.getUsersId(data)

    if (reqData) {
      await this.api.removeUsersFromChat(reqData)
    }
  }

  async getUsersId(data: { login: string }) {
    const currentUsers = await userController.searchUserByLogin(data)

    if (!(currentUsers instanceof Error)) {
      const usersId: number[] = []

      if (currentUsers.length) {
        currentUsers.forEach(user => {
          usersId.push(user.id)
        })

        return { users: usersId, chatId: store.getState().selectedChat }
      }

      return undefined
    }
    return undefined
  }

  updateLastMessage(id: number, message: MessageType) {
    const current = store.getState().chatList.data.find(el => el.id === id)
    current!.last_message = {
      ...current!.last_message,
      content: message.content,
      time: message.time
    }
  }

  async getToken(id: number) {
    const { response } = (await this.api.getToken(id)) as XMLHttpRequest
    return response.token
  }
}

export default new ChatsController()
