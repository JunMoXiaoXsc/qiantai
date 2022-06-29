<template>
  <div>
    <!-- 用户注册 -->
    <el-card class="box-card" id="TanChuCeng">
      <div slot="header" class="clearfix">
        <span>用户注册</span>
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
            <el-button @click="trueRegister()">确认注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      //用户注册数据
      form: {
      },
    }
  },
  methods: {
    //注册
    trueRegister: function () {
      this.$http.post('fu/addFuser', this.form).then((res) => {
        console.log("🚀 注册后返回的数据", res)
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '注册成功'
          })
          this.$router.push('/toLogin')
        }
      });
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
