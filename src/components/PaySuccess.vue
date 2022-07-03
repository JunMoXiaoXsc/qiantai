vbase
<template>
  <div>
    支付成功
  </div>
</template>

<script>
export default {
  name: 'PaySuccess',
  data() {
    return {

    }
  },
  mounted() {
    //获取路径中的订单id
    let oid = this.GetQueryString("out_trade_no")
    console.log("🚀 获取路径中的订单id", oid)
    //往后台发送ajax请求 查询订单是否支付成功
    this.$http.post("fu/payCheck", { oid: oid }).then(res => {
      console.log("🚀 检测订单是否支付成功返回的数据", res)
      if (res.data.success) {
        this.$router.push("/MyOrders")
      }
    })
  },
  methods: {
    //获取请求路径中的name参数的值
    GetQueryString(name) {
      let href = window.location.href
      let query = href.substring(href.indexOf('?') + 1)
      let vars = query.split('&')
      console.log("🚀  vars", vars)
      for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=')
        if (pair[0] == name) {
          return pair[1];
        }
      }

    }
  }
}
</script>

<style scoped>
</style>
