/**
 * @param {Array} arr
 * @param {Number} baseIndex
 * @returns {Array}
 * 给所有数组元素添加 index 属性，index 从 baseIndex 开始计数
 */
export const resetIndex = (arr, baseIndex) => {
  return arr.map((v, i) => {
    v.index = baseIndex + i + 1
    return v
  })
}
