export const camelString = str => {
  return str.replace(/\w/, m => m.toUpperCase())
}
