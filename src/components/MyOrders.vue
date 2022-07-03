<template>
  <div>
    <div id="payPage" v-html="payContent">
    </div>
    <!-- 订单列表 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="oid" label="订单编号">
      </el-table-column>
      <el-table-column prop="fuser.username" label="姓名">
      </el-table-column>
      <el-table-column prop="createDate" label="下单时间">
      </el-table-column>
      <el-table-column prop="cprice" label="总价格">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.ostate == 0" style="color:red">未付款</span>
          <span v-else style="color:green">已付款</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="rowInfo(scope.row, true)" type="text" size="small">查看详情</el-button>
          <el-button v-if="scope.row.ostate == 0" type="text" size="small" @click="PayMoney(scope.row)">付款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 订单详情列表 -->
    <el-card class="box-card" id="TanChuCeng" v-if="seen">
      <el-table :data="orderInfo" border style="width: 100%;" height="330">
        <el-table-column prop="pid" label="商品编号">
        </el-table-column>
        <el-table-column prop="product.pname" label="商品名称">
        </el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="Image(scope.row.product.imgPath)" class="image">
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格">
        </el-table-column>
      </el-table>
      <div>
        <el-button @click="rowInfo('', false)">关闭</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MyOrders',
  data() {
    return {
      //表格数据
      tableData: [],
      //订单详情数据
      orderInfo: [],
      //支付中专页面
      payContent: '',
      //显示商品详情
      seen: false,

    }
  },
  mounted() {
    this.listMyOrders()
  },
  methods: {
    //商品图片
    Image: function (imgpath) {
      return this.$imgServer + imgpath;
    },
    //订单详情页面
    rowInfo(row, flag) {
      console.log(row);
      if (flag) {
        this.orderInfo = row.orderList
        this.seen = true
      } else {
        this.seen = false
      }
    },
    listMyOrders() {
      this.$http.post("fu/listMyOrders").then((res) => {
        console.log("🚀 我的订单信息", res)
        this.tableData = res.data
      })
    },
    //付款
    PayMoney(row) {
      this.$http.post("fu/pay", { oid: row.oid, oname: row.fuser.username, money: row.cprice, desc: '' }).then((res) => {
        console.log("🚀 支付返回的数据", res)
        if (res.data.success) {
          this.payContent = res.data.target
          //在主流程渲染过后 在执行这一段代码 否则获取不到form
          this.$nextTick((res) => {
            let form = document.getElementsByName("punchout_form")[0];
            form.submit();
          })
        } else {
          this.$message("该订单已经支付")
        }
      })
    }
  }
}
</script>

<style scoped>
/* 订单详情样式 */
#TanChuCeng {
  border: 1px solid darkgreen;
  width: 600px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 1999;
  overflow: hidden;
}

/* 图片样式 */
.image {
  width: 100px;
  height: 50px;
  display: block;
}
</style>
