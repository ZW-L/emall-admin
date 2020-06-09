export const validUsername = (username) => {
  const users = ['admin', 'editor']
  return users.indexOf(username.trim()) > -1
}
