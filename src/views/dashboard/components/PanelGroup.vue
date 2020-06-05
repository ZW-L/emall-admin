<template>
  <el-row class="panel-group" :gutter="20">
    <el-col :span="6">
      <div class="panel-group-item">
        <div class="icon-wrapper">
          <div class="panel-icon panel-icon__peoples">
            <svg-icon icon-class="peoples" class-name="card-panel-icon"></svg-icon>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="panel-group-item">
        <div class="icon-wrapper">
          <div class="panel-icon panel-icon__peoples">
            <svg-icon icon-class="message" class-name="card-panel-icon"></svg-icon>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="panel-group-item">
        <div class="icon-wrapper">
          <div class="panel-icon panel-icon__peoples">
            <svg-icon icon-class="money" class-name="card-panel-icon"></svg-icon>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="panel-group-item">
        <div class="icon-wrapper">
          <div class="panel-icon panel-icon__peoples">
            <svg-icon icon-class="cart" class-name="card-panel-icon"></svg-icon>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.panel-group {
  &-item {
    height: 100px;
    background-color: #fff;
    .icon-wrapper {
      float: left;
      margin: 10px;
      width: 80px;
      height: 80px;
      background-color: #ccc;
      border-radius: 5px;
      .panel-icon {
        text-align: center;
        line-height: 80px;
        font-size: 48px;
      }
    }
  }
}
</style>
