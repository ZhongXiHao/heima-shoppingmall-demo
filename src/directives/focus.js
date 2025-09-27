export default {
  inserted (el) {
    setTimeout(() => el.focus(), 0)
  },
  updated (el) {
    el.focus()
  }
}
