export const isExternal = (path) => {
  return /^(https?:|tel:|mailto:)/.test(path)
}

export const validUsername = (username) => {
  const users = ['admin', 'editor']
  return users.indexOf(username.trim()) > -1
}
