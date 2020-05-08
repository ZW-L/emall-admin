export const camelPath = str => {
  return str.replace(/\/(\w)/g, (m, $1) => $1.toUpperCase())
}
