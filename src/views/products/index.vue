<template>
  <div class="table-wrapper">
    <el-alert type="info" effect="dark">提示：点击编辑按钮可修改商品详细信息。</el-alert>
    <filter-card @search="handleSearch"></filter-card>
    <!-- 商品列表 -->
    <el-table :data="products" stripe highlight-current-row
      v-loading.fullscreen="fullscreenLoading"
      element-loading-text="正在操作"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column label="序号" type="index" :index="updateIndex" width="60px" align="center" />
      <el-table-column label="商品名" prop="name" width="100px" />
      <el-table-column label="添加时间" prop="create_date" width="200px" align="center" />
      <el-table-column label="商品 ID" prop="id" width="110px" />
      <el-table-column label="缩略图" prop="thumbnail" width="150px" align="center">
        <template v-slot="scope">
          <img class="table-img" :src="scope.row.thumbnail" />
        </template>
      </el-table-column>
      <el-table-column label="品类" prop="category" width="100px" align="center" />
      <el-table-column label="标签" prop="tags" width="150px" align="center">
        <template v-slot="scope">
          <el-tag
            v-for="(item, index) of scope.row.tags" :key="index"
            size="mini"
          >{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="上架" prop="onsale" width="100px" align="center">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.onsale"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleOnsaleChange"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button
            size="mini" type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini" type="danger"
            @click="handleDeleteProduct(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 商品详情框 -->
    <el-dialog title="编辑商品信息" :visible.sync="productFormVisible" width="450px">
      <el-form :model="productForm" label-width="80px">
        <el-form-item label="商品名">
          <el-input v-model="productForm.name" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品 ID">
          <el-input v-model="productForm.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="缩略图">
          <el-input v-model="productForm.thumbnail" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="品类">
          <el-radio v-model="productForm.category" label="手机">手机</el-radio>
          <el-radio v-model="productForm.category" label="电脑">电脑</el-radio>
          <el-radio v-model="productForm.category" label="化妆品">化妆品</el-radio>
        </el-form-item>
        <!-- <el-form-item label="标签">
          <el-input v-model="productForm.tags" autocomplete="off" clearable></el-input>
        </el-form-item> -->
        <el-form-item label="上架状态">
          <el-switch v-model="productForm.onsale" active-text="上架" inactive-text="下架" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="productFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateProduct">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 表格分页 -->
    <table-pagination
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="all_result"
    />
  </div>
</template>

<script>
import { getProducts, updateProduct, deleteProduct } from '@/api/product.js'
import { sleep } from '@/utils/util'
import FilterCard from './FilterCard'
import TablePagination from '@/components/TablePagination'

export default {
  name: 'products',

  data () {
    return {
      products: [],
      all_result: 0, // 符合筛选结果的数据总数
      currentPage: 1, // 当前显示的页码
      pageSize: 50, // 每页显示的条目数
      fullscreenLoading: false, // 是否显示加载动画
      productFormVisible: false, // 产品详情弹窗
      filterForm: { // 表单筛选
        category: 'all',
        dateRange: ['', ''],
        onsale: '',
        search: '',
        reverse: false
      },
      productForm: ''
    }
  },

  components: {
    FilterCard,
    TablePagination
  },

  mounted () {
    this.hanbdleGetProducts()
  },

  methods: {
    hanbdleGetProducts () {
      this.fullscreenLoading = true
      getProducts({
        page: this.currentPage,
        limit: this.pageSize,
        category: this.filterForm.category,
        reverse: this.filterForm.reverse,
        dateRange: this.filterForm.dateRange,
        onsale: this.filterForm.onsale,
        search: this.filterForm.search
      }).then(res => {
        const { data } = res
        this.products = data.items
        this.all_result = data.all_result
        this.fullscreenLoading = false
      }).catch(err => {
        console.log(err)
        this.fullscreenLoading = false
      })
    },
    // 更新索引
    updateIndex (index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    // 切换上下架状态
    handleOnsaleChange (val) {
      this.fullscreenLoading = true
      sleep(1000).then(() => {
        if (val) {
          this.$message({
            type: 'success',
            message: '上架成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '已下架商品'
          })
        }
        this.fullscreenLoading = false
      })
    },
    // 改变分页显示条数、切换页码、筛选搜索，都要重新获取数据
    handleSizeChange (val) {
      this.pageSize = val
      this.hanbdleGetProducts()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.hanbdleGetProducts()
    },
    handleSearch (list) {
      this.filterForm.category = list.category
      this.filterForm.onsale = list.onsale
      this.filterForm.dateRange = list.dateRange
      this.filterForm.search = list.search
      this.hanbdleGetProducts()
    },
    // 修改产品信息
    handleEdit (index, row) {
      this.productFormVisible = true
      this.productForm = Object.assign({}, row)
      console.log(this.productForm)
    },
    // 删除操作
    handleDeleteProduct (index, row) {
      this.$confirm('此操作将删除该商品, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        deleteProduct(row.id).then(res => {
          if (res.status === 200) {
            this.hanbdleGetProducts()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '删除已取消。'
        })
      })
    },
    // 更新商品数据
    handleUpdateProduct () {
      console.log(this.productForm)
      updateProduct(this.productForm).then(res => {
        if (res.status === 200) {
          this.productFormVisible = false
          this.hanbdleGetProducts()
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
        }
      }).catch(err => {
        console.log(err)
        this.productFormVisible = false
        this.$message({
          type: 'error',
          message: '更新失败！'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  box-sizing: border-box;
  margin: 10px;
  .el-table {
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    .el-tag {
      margin: 0 2px;
    }
    .table-img {
      max-width: 100px;
    }
  }
}
</style>
