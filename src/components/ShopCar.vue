<template>
  <div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="商品编号" width="120">
        <template slot-scope="scope">{{ scope.row.product.pid }}</template>
      </el-table-column>
      <el-table-column prop="product.pname" label="商品名称" width="120">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="120">
      </el-table-column>
      <el-table-column label="商品数量" width="300">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.num" @change="handleChange(scope.row)" :min="1"
            :max="scope.row.product.stock" label="描述文字"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="商品小计">
        <template slot-scope="scope">
          {{ scope.row.num * scope.row.price }}
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <div style="float: left; height: 30px; padding-left: 5px;">
        总计：{{ zongji }}
      </div>
    </div>
    <div style="margin-top: 20px">
      <!-- 选择地址 -->
      <el-select v-model="value" placeholder="请选择" style="width: 100%">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div style="margin-top: 20px">
      <el-button type="primary" @click="trueBuy()">确认购买</el-button>
      <el-button type="info" @click="removeShopCar()">移除购物车</el-button>
      <el-button type="danger" @click="cleanShopCar()">清空购物车</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopCar",
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      //购物车数据
      tableData: [],
      //选中的商品
      multipleSelection: []
    }
  },
  mounted() {
    this.shopCarInfo()
  },
  computed: {
    zongji: function () {
      let total = 0;
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let row = this.multipleSelection[i];
        let xiaoji = row.num * row.price;
        total += xiaoji;
      }
      return total;
    }
  },
  methods: {
    //购物车数据
    shopCarInfo: function () {
      this.$http.post("fu/listShopCar").then((res) => {
        console.log("🚀 我的购物车", res)
        this.tableData = res.data
      })
    },
    //全选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //选中的商品的小计数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //计数器改变事件
    handleChange(row) {
      console.log("🚀 更改数量的当前行信息", row)
      this.$http.post("fu/updateStock", { pid: row.product.pid, uid: row.fuser.fuid, num: row.num }).then(res => {
      })
    },
    //确认购买
    trueBuy: function () {
      console.log("🚀 购物车数据", this.multipleSelection)
      console.log("🚀 购物车数据", this.value)
      let orderStr = ''
      this.multipleSelection.forEach((res) => {
        orderStr += res.fuser.fuid + ',' + this.zongji + ',' + res.product.pid + ',' + res.num + ',' + res.price + "," + this.value
        orderStr += "/"
      })
      console.log("🚀 确认购买拼好的数据", orderStr)
      this.$http.post("fu/saveorders", { orderStr: orderStr }).then((res) => {
        if (res.data.success) {
          this.removeShopCar();
          this.$message({
            type: "success",
            message: '购买成功请前往我的订单查看'
          })
        } else {
          this.$message({
            type: "error",
            message: res.data.error
          })
        }
      })
    },
    //清空购物车
    cleanShopCar: function () {
      this.$http.post("fu/cleanShopCar").then((res) => {
        console.log("🚀清空购物车返回的数据", res)
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '清空成功'
          })
          this.$emit("fatherCount")
          this.shopCarInfo()
        } else {
          this.$message({
            type: 'error',
            message: res.data.error
          })
        }
      })
    },
    //移除购物车
    removeShopCar: function () {
      let removeStr = ''
      this.multipleSelection.forEach((item) => {
        removeStr += item.product.pid + ','
      })
      this.$http.post("fu/removeShopCar", { str: removeStr }).then((res) => {
        if (res.data.success) {
          this.shopCarInfo()
          //购物车内的数量
          this.$emit("fatherCount")
        }
      })

    }
  }
}
</script>

<style>
</style>
