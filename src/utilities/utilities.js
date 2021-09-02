export const getDateTime = (date) => {
  return new Date(date).toLocaleDateString('sq-AL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}