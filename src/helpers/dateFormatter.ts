export function useDateFormatter(date: string) {
  const current = new Date(date)
  if (current.toString() === 'Invalid Date') {
    return date
  }
  const formated = new Intl.DateTimeFormat('ru-Ru', {
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short'
  })

  return formated.format(current)
}
