<template>
  <div>
    <el-container style="width: 1050px;margin: auto;">
      <!-- 头部 -->
      <el-header>
        <span style="float: left;font-size: 30px;padding-left:10 px; color: aquamarine;">果然有缘商城</span>
        <!-- 个人信息部分 -->
        <span style="float: right;margin-top: 10px;">
          <div>
            <el-badge :value="12" class="item">
              <span style="color:blue;">
                {{ this.currUser.username }}
              </span>
              <el-dropdown>
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button style="width:100%;height:30px;" @click="toIndex()">首页
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button style="width:100%;height:30px;" @click="showLogin()">登录
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button style="width:100%;height:30px;" @click="logout()">退出登录
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-badge :value="12" class="item">
                      <el-button style="width:100%;height:100%;" @click="myShopCar()">我的购物车</el-button>
                    </el-badge>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-badge>

          </div>

        </span>

        <!-- 头部结束 -->
      </el-header>
      <!-- 内容 -->
      <el-main v-loading.fullscreen.lock="fullscreenLoading">
        <router-view></router-view>
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
      //加载
      fullscreenLoading: false,
      //yonghu duixiang
      form: {
        username: 'xsc',
        password: '123'
      },
      //当前登录用户
      currUser: {},
      //登录卡片
      seen: false,
    }
  },
  //页面加载事件
  mounted: function () {
    //获取登录的用户
    this.currUser = JSON.parse(sessionStorage.getItem("user"));
    if (JSON.parse(sessionStorage.getItem("user")) == null) {
      this.currUser = {}
    }
  },
  methods: {
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
          this.$router.push("/")
        } else {
        }
      })
    },
    //跳到购物车
    myShopCar() {
      this.$router.push("/ShopCar")
    },
    //跳到首页
    toIndex() {
      this.$router.push("/")
    },
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



.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
