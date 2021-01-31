<template>
  <div class="index">
    <el-container>
      <el-header>
        <h1>小U商城后台管理系统</h1>
        <div class="userInfo">
          <span>{{ getUserInfo.username }}</span>
          <el-button @click="loginOut" type="danger" size="mini">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <aside-nav></aside-nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import asideNav from "../components/asideNav";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    asideNav,
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    ...mapActions(["changeUserInfoAction"]),
    loginOut() {
      //修改getUserInfo它的仓库状态然后跳转到登录
      this.changeUserInfoAction(null);
      this.$router.push("/login");
    },
  },
};
</script>

<style  lang="stylus" scoped>
@import '../stylus/index.styl';

.index {
  width: 95vw;
  margin: 0 auto;

  .el-header {
    display flex
    justify-content space-between
    height: 120px !important;
    background-color: $mainColor;

    h1 {
      padding-left: 30px;
      line-height: 120px;
      color: #fff;
      font-size: $title;
    }

    .userInfo {
      float: right;
      margin-top: 80px;
    }
  }

  .el-aside {
    width: 220px !important;
    height: 80vh !important;
    background: $bgc;
  }
}
</style>
