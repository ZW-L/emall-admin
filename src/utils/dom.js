// 回到 .main-container 的顶部
export const scrollToTop = () => {
  const el = document.getElementsByClassName('main-container')[0]
  el.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth'
  })
}
