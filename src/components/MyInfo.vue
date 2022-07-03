vbase
<template>
  <div>
    <el-row>
      <el-col :span="4" style="height:500px;background-color:#C0C4CC">
        <div class="divInfo">
          <el-link type="primary" @click="toMyOrdes">我的订单</el-link>
        </div>
        <div class="divInfo">
          <el-link type="primary" @click="toMyOrdes">我的订单</el-link>
        </div>
      </el-col>
      <el-col :span="20" style="height:500px;">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MyInfo',
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    toMyOrdes() {
      this.$router.push('/MyOrders')
    }
  }
}
</script>

<style scoped>
/* 左面菜单栏样式 */
.divInfo {
  padding: 20px;
  text-align: center;
}
</style>
