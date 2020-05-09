export const camelPath = str => {
  return str.replace(/\/(\w)/g, (m, $1) => $1.toUpperCase())
}

export const format = url => {
  const search = url.split('?')[1]

  if (!search) {
    return {}
  }

  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, ':')
        .replace(/\+/g, ' ') +
    '"}'
  )
}
