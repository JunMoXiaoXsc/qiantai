<template>
  <div>
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
          <el-button @click="rowInfo(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">付款</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'MyOrders',
  data() {
    return {
      //表格数据
      tableData: [],
    }
  },
  mounted() {
    this.listMyOrders()
  },
  methods: {
    rowInfo(row) {
      console.log(row);
    },
    listMyOrders() {
      this.$http.post("fu/listMyOrders").then((res) => {
        console.log("🚀 我的订单信息", res)
        this.tableData = res.data
      })
    }
  }
}
</script>

<style scoped>
</style>
