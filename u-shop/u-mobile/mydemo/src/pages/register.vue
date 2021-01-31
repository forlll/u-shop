<template>
  <div>
    <van-nav-bar title="注册" left-arrow @click-left="$router.back()" />
    <div class="box">
      <img src="../assets/images/logo_orange.png" alt="" />
    </div>
    <van-form @submit="toReg">
      <van-field
        v-model="regList.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="regList.nickname"
        name="昵称"
        label="昵称"
        placeholder="请输入昵称"
        :rules="[{ required: true, message: '请输入昵称' }]"
      />
      <van-field
        v-model="regList.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";
import { register } from "../util/axios";
export default {
  data() {
    return {
      regList: {
        phone: "",
        ninkname:'',
        password: "",
      },
    };
  },
  methods: {
    toReg() {
      register(this.regList).then((res) => {
        if (res.code == 200) {
          this.$router.push("/login");
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
