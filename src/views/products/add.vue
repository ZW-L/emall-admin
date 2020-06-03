<template>
  <el-form :model="product"
    label-width="80px" class="product-add-form"
    v-loading.fullscreen="fullscreenLoading"
    element-loading-text="正在操作"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-form-item label="商品名">
      <el-input v-model="product.name" clearable></el-input>
    </el-form-item>
    <el-form-item label="缩略图">
      <el-input v-model="product.thumbnail" clearable></el-input>
    </el-form-item>
    <el-form-item label="状态">
      <el-radio v-model="product.onsale" label="true">上架</el-radio>
      <el-radio v-model="product.onsale" label="false">下架</el-radio>
    </el-form-item>
    <el-form-item label="分类">
      <el-select v-model="product.category" placeholder="请选择分类">
        <el-option label="手机" value="手机"></el-option>
        <el-option label="电脑" value="电脑"></el-option>
        <el-option label="化妆品" value="化妆品"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="标签">
      <el-checkbox-group v-model="product.tags">
        <el-checkbox label="新品" name="type"></el-checkbox>
        <el-checkbox label="流行" name="type"></el-checkbox>
        <el-checkbox label="简约" name="type"></el-checkbox>
        <el-checkbox label="商务" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="商品简介">
      <el-input type="textarea" v-model="product.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">添加商品</el-button>
      <el-button @click="onClear">清空信息</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { addProduct } from '@/api/product'

export default {
  name: 'product-add',

  data () {
    return {
      product: {
        name: '',
        onsale: '',
        category: '',
        tags: [],
        desc: '',
        thumbnail: ''
      },
      fullscreenLoading: false
    }
  },

  methods: {
    onSubmit () {
      this.fullscreenLoading = true
      addProduct(this.product).then(res => {
        if (res.status === 200) {
          this.fullscreenLoading = false
          this.onClear()
          this.$message({
            type: 'success',
            message: '成功添加商品！'
          })
        }
      }).catch(err => {
        console.log(err)
        this.fullscreenLoading = false
        this.$message({
          type: 'error',
          message: '操作失败！'
        })
      })
    },
    onClear () {
      this.product = {
        name: '',
        onsale: '',
        category: '',
        tags: [],
        desc: '',
        thumbnail: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-add-form {
  padding: 30px;
  width: 600px;
}
</style>
