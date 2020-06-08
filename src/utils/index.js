export const debounce = (fn, wait = 50, immediate = false) => {
  let timer = null
  return function (...args) {
    if (immediate && !timer) {
      fn.apply(this, args)
    }

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

export const throttle = (fn, timeout = 50) => {
  let start = Date.now()
  return function (...args) {
    const now = Date.now()
    if (now - start >= timeout) {
      start = now
      fn.apply(this, args)
    }
  }
}
