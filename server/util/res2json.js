module.exports = function (code, msg, res = []) {
  return {
    status: code,
    msg: msg,
    result: res
  }
}
