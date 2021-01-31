<template>
  <div class="container">
    <h1>欢迎登录</h1>
    <el-form
      :model="usersForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="usersForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="usersForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
// 引入封装好的接口模块
import { userLogin } from "../uitl/axios";
export default {
  data() {
    return {
      usersForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(['changeUserInfoAction']),
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userLogin(this.usersForm).then((res) => {
            console.log(res.data.list,"登录");
            if (res.data.code===200) {
              this.$message.success(res.data.msg);
              // 把登录结果存储到会话存储中
              // sessionStorage.setItem('loginInfo',JSON.stringify(res.data.list));
              // 把信息存储到vuex中
              this.changeUserInfoAction(res.data.list)
              // 跳转到首页
              this.$router.push("/index");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("用户名或密码错误！");
          return false;
        }
      });
    },
  },
};
</script>

<style  lang="stylus" scoped>
@import '../stylus/index.styl';

.container {
  width: 400px;
  height: 300px;
  margin: 100px auto 0;
  padding: 30px;

  h1 {
    text-align: center;
    margin: 20px 0;
    color: $mainColor;
    font-size: $title;
  }

  .demo-ruleForm {
    margin-left: -60px;

    .el-button {
      width: 360px;
      background-color: $mainColor;
      border: 1px solid $mainColor;
    }
  }
}
</style>
