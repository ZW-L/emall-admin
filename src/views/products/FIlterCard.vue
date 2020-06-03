<template>
  <el-card class="filter-card">
    <div slot="header">
      <span>
        <i class="el-icon-search"></i>筛选搜索
       </span>
    </div>
    <el-form inline class="demo-form-inline">
      <el-form-item label="所属分类">
        <el-select
          placeholder="选择商品分类"
          v-model="list.cate"
          clearable
          size="medium">
          <el-option label="手机" value="手机"></el-option>
          <el-option label="电脑" value="电脑"></el-option>
          <el-option label="化妆品" value="化妆品"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上架状态">
        <el-select
          placeholder="选择上架状态"
          v-model="list.onsale"
          clearable
          size="medium">
          <el-option label="上架" value="true"></el-option>
          <el-option label="下架" value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-model="list.dateRange"
          size="medium"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input
          placeholder="输入商品名/ID"
          size="medium"
          v-model="list.search"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'FilterCard',
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '一年内',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '两年内',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 2)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '三年内',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 3)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '五年内',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 5)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      list: {
        cate: '',
        onsale: '',
        dateRange: ['', ''],
        search: ''
      }
    }
  },

  methods: {
    onSubmit () {
      this.$emit('search', this.list)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
