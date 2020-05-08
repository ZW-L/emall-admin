export const handleDeleteItem = (index, row) => {
  console.log(index, row)
  this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this.orders.splice(index, 1)
    this.$message({
      type: 'success',
      message: '删除成功!'
    })
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '已取消删除'
    })
  })
}
