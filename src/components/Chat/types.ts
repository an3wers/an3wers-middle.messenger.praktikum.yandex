export interface Contact {
  name: string
  avatar: string
  lastMessege: {
    text: string
    isSelf: string
    date: string
  }
  isActive: string
  unread: {
    count: number
    isBadge: string
  }
}
