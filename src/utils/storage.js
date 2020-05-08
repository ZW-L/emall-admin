const storage = window.localStorage

export const set = (key, value) => storage.setItem(key, value)
export const get = (key) => storage.getItem(key)
