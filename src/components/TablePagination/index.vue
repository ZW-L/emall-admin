<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  />
</template>

<script>
import { scrollToTop } from '@/utils/dom'

export default {
  props: {
    currentPage: Number,
    pageSizes: {
      type: Array,
      default: () => [20, 30, 50]
    },
    pageSize: Number,
    total: Number
  },

  methods: {
    handleSizeChange (val) {
      this.$emit('sizeChange', val)
      scrollToTop()
    },
    handleCurrentChange (val) {
      this.$emit('currentChange', val)
      scrollToTop()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
