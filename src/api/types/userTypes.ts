export interface ChangeProfileData {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
  display_name: string
}

export interface ChangePasswordData {
  oldPassword: string
  newPassword: string
}

export interface SearchUserData {
  login: string
}

export interface AddUsersData {
  users: number[]
  chatId: number
}

export interface RemoveUsersData {
  users: number[]
  chatId: number
}

export interface RemoveChatData {
  chatId: number
}
