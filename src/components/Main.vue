<template>
  <div>
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="0">全部</el-menu-item>
      <el-menu-item v-for="item in ptypeData" :key="item.tid" :index="item.tid + ''">{{ item.tname }}</el-menu-item>
    </el-menu>
    <el-row>
      <el-col :span="24">
        <el-card name="el-card" v-for="(item, index) in productData" :style="carLeft(index)" :key="item.pid"
          :body-style="{ padding: '0px' }">
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
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      //默认类别
      activeIndex2: '0',
      //商品数据
      productData: [],
      //商品类别数据
      ptypeData: [],
      //搜索关键字
      keyword: "",
      //每页显示的数量
      pageSize: 8,
      //总条数
      total: 0,
      //当前页
      currentPage: 1,
      tid: 0,
    }
  },
  //页面加载事件
  mounted: function () {
    this.loadData();
    //加载类别数组
    this.$http.post("pro/listPtype").then(res => {
      this.ptypeData = res.data;
    })
  },
  methods: {
    //控制商品左边距
    carLeft: function (index) {
      if (index % 4 != 0) {
        return "margin-left:14px;"
      } else {
        return "margin-left:0px;"
      }

    },
    // 加载商品数据数据load
    loadData: function () {
      this.fullscreenLoading = true;
      this.$http.post("pro/listData", {
        keyword: this.keyword,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        tid: this.tid
      }).then(res => {
        this.productData = res.data.list;
        console.log("🚀 后端传来的商品数据", res.data.list)
        this.total = res.data.total;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 500)
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
  }

}
</script>

<style scoped>
.image {
  width: 100%;
  display: block;
}

.el-card {
  width: 250px;
  float: left;
  margin-bottom: 5px;
}
</style>
