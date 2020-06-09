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
          <el-option label="大众会员" value="大众会员"></el-option>
          <el-option label="高级会员" value="高级会员"></el-option>
          <el-option label="超级会员" value="超级会员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="输入用户名/ID/邮箱搜索"
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
      list: {
        vip: '',
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
