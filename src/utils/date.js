const getTime = date => (new Date(date)).getTime()

export const isInDateRange = (date, dateRange) => {
  const range = dateRange.map(getTime)
  const d = getTime(date)

  return d >= range[0] && d <= range[1]
}
