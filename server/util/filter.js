/**
 * @param {object} obj
 * @param {array} filter
 * @returns {Array}
 */
const filterFields = function (obj, filter = []) {
  return filter.length
    ? Object.entries(obj).filter(v => filter.indexOf(v[0]) === -1)
    : Object.entries(obj)
}

const filterSecret = function (obj, filter = []) {
  return Object.fromEntries(filterFields(obj, filter))
}

module.exports = {
  filterFields,
  filterSecret
}
