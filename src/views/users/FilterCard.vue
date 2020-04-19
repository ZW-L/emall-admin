<template>
  <el-card class="filter-card">
    <div slot="header">
      <span>
        <i class="el-icon-search"></i>筛选搜索
       </span>
    </div>
    <el-form inline class="demo-form-inline">
      <el-form-item label="会员">
        <el-select
          placeholder="选择会员等级"
          v-model="list.vip"
          clearable
          size="medium">
          <el-option label="大众会员" value="normal"></el-option>
          <el-option label="高级会员" value="high"></el-option>
          <el-option label="超级会员" value="super"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-model="list.date"
          size="medium"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="输入用户名或邮箱搜索"
          size="medium"
          v-model="list.input"
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
        }]
      },
      list: {
        date: '',
        vip: '',
        input: ''
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
.filter-card {
  margin: 10px 0;
}
</style>
