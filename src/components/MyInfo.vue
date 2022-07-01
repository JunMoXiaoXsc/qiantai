vbase
<template>
  <div>
    <el-row>
      <el-col :span="4" style="height:500px;border:1px solid red">
        <a href="javascript:void(0)" @click="toMyOrdes">我的订单</a>
      </el-col>
      <el-col :span="20" style="height:500px;border:1px solid red">
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
</style>
