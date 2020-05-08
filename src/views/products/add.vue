<template>
  <el-form ref="form" :model="product" label-width="80px" class="product-add-form">
    <el-form-item label="商品名">
      <el-input v-model="product.name"></el-input>
    </el-form-item>
    <el-form-item label="状态">
      <el-radio v-model="product.status" label="onsale">在售</el-radio>
      <el-radio v-model="product.status" label="soldout">下架</el-radio>
      <el-radio v-model="product.status" label="stockout">缺货</el-radio>
    </el-form-item>
    <el-form-item label="分类">
      <el-select v-model="product.categories" placeholder="请选择分类">
        <el-option label="化妆品" value="cosmetics"></el-option>
        <el-option label="数码产品" value="Digital"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="标签">
      <el-checkbox-group v-model="product.type">
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
export default {
  name: 'product-add',
  data () {
    return {
      product: {
        name: '',
        status: '',
        categories: '',
        type: [],
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit')
      // todo: 提交修改请求到服务器期间，展示一个 loading 动画，在收到服务器响应时关闭动画
    },
    onClear () {
      this.product = {
        name: '',
        status: '',
        categories: '',
        type: [],
        desc: ''
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
