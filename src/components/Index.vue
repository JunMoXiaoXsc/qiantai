<template>
  <div>
    <!-- 遮罩层 -->
    <div v-if="seen" id="ZheZhaoCeng"></div>
    <!-- 购物车 -->
    <div id="shopCar" v-if="ShowshopCar">
      <table>
        <tr>
          <th>商品编号</th>
          <th>商品名称</th>
          <th>商品价格</th>
          <th>商品数量</th>
          <th>商品小计</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, index) in listShopCar" :key="index">
          <td>{{ item.pid }}</td>
          <td>{{ item.pname }}</td>
          <td>
            {{ item.price }}
          </td>
          <td>
            <!-- BUG:在输入框内修改数据数据库内不能实时变化 -->
            <button @click="red(index)">-</button>
            <input v-model="item.stock" type="text" style="width: 50px;">
            <button @click="add(index)">+</button>
          </td>
          <td>{{ item.stock * item.price }}</td>
          <td><button @click="deleteList(item)">移除购物车</button></td>
        </tr>

      </table>
      <div>
        合计:<span>{{ SumPrice }}</span><br>
      </div>
      <el-button @click="trueBuy(false)">确认购买</el-button>
      <el-button @click="myShopCar(false)">关闭购物车</el-button>
    </div>

    <el-container style="width: 1050px;margin: auto;">
      <!-- 头部 -->
      <el-header>
        <span style="float: left;font-size: 30px;padding-left:10 px; color: aquamarine;">果然有缘商城</span>
        <!-- 个人信息部分 -->
        <span style="border: 1px solid red;float: right;margin-top: 10px;">
          <div>
            <el-dropdown>
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button style="width:100%;height:30px;" @click="showLogin()">登录
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="width:100%;height:30px;" @click="logout()">退出登录
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button style="width:100%;height:30px;" @click="myShopCar(true)">我的购物车</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            {{ this.currUser.username }}
          </div>

        </span>

        <!-- 头部结束 -->
      </el-header>
      <!-- 内容 -->
      <el-main>
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="0">全部</el-menu-item>
          <el-menu-item v-for="item in ptypeData" :key="item.tid" :index="item.tid + ''">{{ item.tname }}</el-menu-item>
        </el-menu>
        <el-row>
          <el-col :span="24">
            <el-card v-for="item in productData" :key="item.pid"
              style="width: 250px;float: left;margin-left: 0px;margin-bottom: 5px;" :body-style="{ padding: '0px' }">
              <img :src="Image(item.imgPath)" style="height: 250px;" class="image">
              <div style="padding: 14px;">
                <span>{{ item.pname }}</span> <br />
                <span style="color:red">价格:{{ item.price }}元/斤</span><br />
                <span style="color: green">库存:{{ item.stock }}</span><br />
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="addShopCar(item)">加入购物车</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total"
          :current-page="currentPage" @current-change="currentChange">
        </el-pagination>
      </el-main>
      <!-- 内容结束 -->
      <!-- 下面 -->
      <el-footer>Footer</el-footer>
    </el-container>
    <!-- 下面 结束-->
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      //yonghu duixiang
      form: {
        username: 'xsc',
        password: '123'
      },
      //当前登录用户
      currUser: {},
      //购物车 显示隐藏
      ShowshopCar: false,
      //购物车数据
      listShopCar: [],
      //登录卡片
      seen: false,
      //搜索关键字
      keyword: "",
      //每页显示的数量
      pageSize: 8,
      //总条数
      total: 0,
      //当前页
      currentPage: 1,
      //商品数据
      productData: [],
      //商品类别数据
      ptypeData: [],
      //默认类别
      activeIndex2: '0',
      //根据商品类别查询
      tid: 0
    }
  },
  //页面加载事件
  mounted: function () {
    //获取登录的用户
    this.currUser = JSON.parse(sessionStorage.getItem("user"));
    if (JSON.parse(sessionStorage.getItem("user")) == null) {
      this.currUser = {}
    }
    this.loadData();
    //加载类别数组
    this.$http.post("pro/listPtype").then(res => {
      this.ptypeData = res.data;
    })
  },
  //计算属性 求总价
  computed: {
    SumPrice() {
      var c = 0
      for (var i = 0; i < this.listShopCar.length; i++) {
        c += parseFloat(this.listShopCar[i].stock * this.listShopCar[i].price)
      }
      return c;
    }
  },
  methods: {
    // 加载商品数据数据load
    loadData: function () {
      this.$http.post("pro/listData", {
        keyword: this.keyword,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        tid: this.tid
      }).then(res => {
        this.productData = res.data.list;
        console.log("🚀 后端传来的数据", res.data.list)
        this.total = res.data.total;
      });
    },
    //商品图片
    Image: function (imgpath) {
      return this.$imgServer + imgpath;
    },
    //当前页改变事件
    currentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.info("当前页：", this.currentPage);
      console.info("每页多少条：", this.pageSize);
      this.loadData();
    },
    //导航栏选中事件
    handleSelect(index) {
      this.tid = index;
      this.loadData();
    },
    //显示用户登录页面
    showLogin: function () {
      this.$router.push('/toLogin');
    },
    //关闭用户登录页面
    closeLogin: function () {
      this.seen = false
    },
    //退出登录
    logout: function () {
      this.$http.post('/logout').then((res) => {
        console.log("🚀退出登录的数据", res)
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          sessionStorage.clear();
          this.currUser = {}
        } else {

        }
      })
    },
    //购物车数据
    shopCarInfo: function () {
      this.$http.post("fu/listShopCar").then((res) => {
        console.log("🚀 我的购物车", res)
        this.listShopCar = res.data
      })
    },
    //打开或关闭购物车
    myShopCar: function (flag) {
      if (flag) {
        this.ShowshopCar = true
        this.shopCarInfo()
      } else {
        this.ShowshopCar = false
      }
    },
    //加入购物车
    addShopCar: function (item) {
      console.log("🚀 要加入购物车的商品信息", item)
      this.$http.post("fu/addShopCar", item).then((res) => {
        console.log("🚀 添加购物车后返回的数据", res)
        if (res.data.success) {
          this.$message({
            message: '添加成功'
          })
        }
      })
    },
    //封装修改库存方法
    updateStock: function (shopCar) {
      this.$http.post("fu/updateStock", shopCar).then(function (response) {
        console.log('修改库存返回的数据', response.data)
      })
    },
    //减少数量
    red(index) {
      if (this.listShopCar[index].stock > 1) {
        this.listShopCar[index].stock--
        this.updateStock(this.listShopCar[index])
      } else {
        this.deleteList(this.listShopCar[index])
        this.shopCarInfo()
      }
    },
    // 加数量
    add(index) {
      this.listShopCar[index].stock++
      this.updateStock(this.listShopCar[index])
    },
    //确认购买
    trueBuy: function () {
      console.log("🚀 购物车数据", this.listShopCar)
    },
    //移除购物车
    deleteList: function (item) {
      console.log("🚀 移除的商品信息", item)
      this.$http.post("fu/removeShopCar", item).then((response) => {
        if (response.data.success) {
          this.$message({
            message: '移除成功'
          })
          this.shopCarInfo()
        } else {
          this.$message({
            message: response.data.error
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  padding: 0px;
  /* line-height: 160px; */
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

/* 卡片样式 */
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
  position: absolute;
  top: 15%;
  left: 35%;
}

#ZheZhaoCeng {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  background: black;
  z-index: 800;
  opacity: 0.4;
  border: 0px solid red;
}



/* 购物车样式 */
#shopCar {
  border: 1px solid darkgreen;
  width: 700px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1999;
  background: white;
}

#shopCar table {
  border: 1px solid red;
  margin: auto;
  border-collapse: collapse;
  width: 100%;
}

#shopCar table,
td,
th,
tr {
  border: 1px solid red;
  padding: 10px;
}
</style>
