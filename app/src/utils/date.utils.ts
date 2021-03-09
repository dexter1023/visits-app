export const formatDate = (date: string) => {
  try {
    return new Date(date).toISOString().split('T')[0]
  } catch {
    return ''
  }
}
