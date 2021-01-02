<template>
  <div class="loginContainer">
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember">记住密码</el-checkbox>
      <el-form-item>
        <el-button type="primary" plain style="width: 100%" @click="submitLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123"
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {
            required: true, message: '请输入密码', trigger: 'blur'
          }
        ]
      },
      checked: false
    }
  },
  methods: {
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
            // 参数合法，valid=true
            if (valid) {
              // 发送登录请求
              this.postRequest("/doLogin/", this.loginForm).then(resp => {
                if (resp) {
                  // // 将JSON字符串转为JSON对象
                  // let user = JSON.stringify(resp.obj);
                  // // 向store中存入当前HR的信息
                  // this.$store.commit("INIT_CURRENTHR", resp.obj);
                  // // 向session中存入当前用户的信息
                  // window.sessionStorage.setItem("user", JSON.stringify());
                  // 重定向路径
                  let path = this.$route.query.redirect;
                  // 路径跳转
                  this.$router.replace((path == undefined || path == '/') ? '/home' : path);
                } else {
                  console.log("登录失败！！！");
                }
              });
            } else {
                console.log("登录参数不合法");
            }
          }
      )
    }
  }
}
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  background: #fff;
  margin: 180px auto;
  width: 350px;
  height: 400px;
  border: 1px solid #eaeaea;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  text-align: center;
}

.loginRemember {
  text-align: left;
  margin: 0px 0px 20px 0px;
}
</style>