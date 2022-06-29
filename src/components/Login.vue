<template>
  <div>
    <!-- 用户登录 -->
    <el-card class="box-card" id="TanChuCeng">
      <div slot="header" class="clearfix">
        <span>用户登录</span>
      </div>
      <div>
        <el-form :model="form" ref="form" label-width="80px" class="demo-form">
          <el-form-item label="账号:">
            <el-input style="width:300px" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input style="width:300px" v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="checkFuser()">登录</el-button>
            <el-button @click="ZCFuser()">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      //用户登陆数据
      form: {
        username: 'xsc',
        password: '123'
      },
    }
  },
  methods: {
    //用户登陆
    checkFuser: function () {
      this.$http.post('/login', this.form).then((response) => {
        console.log("🚀 登陆成功数据", response)
        if (response.data.success) {
          this.$message({
            type: 'success',
            message: '登录成功!'
          });
          let user = JSON.stringify(response.data.target);
          sessionStorage.setItem('user', user)
          this.$router.push('/')
        }
      })
    },
    ZCFuser: function () {
      this.$router.push('/Register')
    },
  },
}
</script>

<style scoped>
#TanChuCeng {
  border: 1px solid darkgreen;
  width: 500px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 1999;
  overflow: hidden;
}
</style>
