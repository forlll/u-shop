<template>
  <div>
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()" />
    <div class="box">
      <img src="../assets/images/logo_orange.png" alt="" />
    </div>
    <van-form @submit="toLogin">
      <van-field
        v-model="loginList.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="loginList.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";
import { login } from "../util/axios";
export default {
  data() {
    return {
      loginList: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    toLogin() {
      login(this.loginList).then((res) => {
        if (res.code == 200) {
          sessionStorage.setItem("userInfo", JSON.stringify(res.list));
          this.$router.push("/mine");
          Toast.success(res.msg);
        } else {
          Toast.fail(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
.van-nav-bar,
.van-button {
  background-color: #ff6040;
}
.box {
  height: 3rem;
  text-align: center;
}
.box img {
  width: 1.8rem;
  height: 0.48rem;
  margin-top: 2rem;
}
.van-button {
  border: #ff6040;
}
</style>
