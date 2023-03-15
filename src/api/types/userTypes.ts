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
