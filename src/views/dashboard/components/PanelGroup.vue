<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6">
      <div class="panel-group-item">
        <div class="panel-icon panel-icon__peoples">
          <svg-icon icon-class="peoples" class-name="card-panel-icon"></svg-icon>
        </div>
        <div class="content-wrapper">
          <div class="content-desc">新访客</div>
          <count-to class="content-counter" :startVal="0" :endVal=counter.visits />
          <div class="content-counter"></div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6">
      <div class="panel-group-item">
        <div class="panel-icon panel-icon__message">
          <svg-icon icon-class="message" class-name="card-panel-icon"></svg-icon>
        </div>
        <div class="content-wrapper">
          <div class="content-desc">消息</div>
          <count-to class="content-counter" :startVal="0" :endVal=counter.message />
          <div class="content-counter"></div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6">
      <div class="panel-group-item">
        <div class="panel-icon panel-icon__money">
          <svg-icon icon-class="money" class-name="card-panel-icon"></svg-icon>
        </div>
        <div class="content-wrapper">
          <div class="content-desc">今日营收</div>
          <count-to class="content-counter" :startVal="0" :endVal=counter.rmb />
          <div class="content-counter"></div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6">
      <div class="panel-group-item">
        <div class="panel-icon panel-icon__cart">
          <svg-icon icon-class="cart" class-name="card-panel-icon"></svg-icon>
        </div>
        <div class="content-wrapper">
          <div class="content-desc">购物车</div>
          <count-to class="content-counter" :startVal="0" :endVal=counter.cart />
          <div class="content-counter"></div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },

  data () {
    return {
      counter: {
        visits: 120054,
        message: 5302,
        rmb: 20150,
        cart: 2243
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  &-item {
    box-sizing: border-box;
    height: 100px;
    margin-bottom: 20px;
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    .panel-icon {
      float: left;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 48px;
      border-radius: 5px;
      transition: all .3s;
      &__peoples {
        color: #065fe0;
      }
      &__message {
        color: #1296db;
      }
      &__money {
        color: #d81e06;
      }
      &__cart {
        color: #19f1ee;
      }
    }

    &:hover {
      .panel-icon {
        color: #fff;
        &__peoples {
          background: #065fe0;
        }
        &__message {
          background: #1296db;
        }
        &__money {
          background: #d81e06;
        }
        &__cart {
          background: #19f1ee;
        }
      }
    }

    .content-wrapper {
      box-sizing: border-box;
      float: right;
      margin: 10px 10px 0 0;
      text-align: center;
      font-weight: bold;
      color: #666;
      .content-desc {
        font-size: 16px;
        line-height: 30px;
      }
      .content-counter {
        font-size: 20px;
      }
    }
  }
}

@media screen and (max-width: 700px) {
  .content-wrapper {
    display: none;
  }

  .panel-icon {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 auto !important;
  }
}
</style>
