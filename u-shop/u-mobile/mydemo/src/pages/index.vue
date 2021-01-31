<template>
  <div class="main">
    <router-view></router-view>
    <van-tabbar router v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to='/home' icon="home-o">商城</van-tabbar-item>
      <van-tabbar-item to='/cate' icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to='/cart' icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to='/mine' icon="user-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
        active:0
    };
  }
};
</script>

<style lang="" scoped>
.van-tabbar{
    position: fixed;
    left: 0;
    bottom: 0;
}
</style>
