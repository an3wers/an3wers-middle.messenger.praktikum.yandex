import BaseAPI from './baseApi'
import { CreateChatData } from './types/chatTypes'
import { AddUsersData, RemoveChatData, RemoveUsersData } from './types/userTypes'

class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats')
  }

  getChats() {
    return this.http.get('/')
  }

  createChat(data: CreateChatData) {
    return this.http.post('/', { data })
  }

  addUsersToChat(data: AddUsersData) {
    return this.http.put('/users', { data })
  }

  removeUsersFromChat(data: RemoveUsersData) {
    return this.http.delete('/users', { data })
  }

  removeChat(data: RemoveChatData) {
    return this.http.delete('/', { data })
  }

  getToken(id: number) {
    return this.http.post(`/token/${id}`)
  }

  create = undefined
  read = undefined
  update = undefined
  delete = undefined
}

export default ChatsAPI
