<template>
  <div>
    <van-nav-bar title="个人中心" />
    <!-- 头像 -->
    <div v-if="userInfo" class="imgInfo">
      <div class="user">
        <img src="../assets/images/header.jpg" alt="" />
        <div class="nick">
          <p class="nickname">{{ userInfo.nickname }}</p>
          <p class="more">完善资料让小U更懂您</p>
        </div>
        <div class="btn">
          <van-button @click="loginOut" type="danger" size="mini"
            >退出登录</van-button
          >
        </div>
      </div>
      <div class="mine">
        <div v-for="item in brandList" :key="item.id">
          <p>{{ item.num }}</p>
          <p class="txt">{{ item.title }}</p>
        </div>
      </div>
      <div class="order">
        <div class="title">
          <p class="left">我的订单</p>
          <p class="right">
            全部订单
            <van-icon name="arrow" size="8" color="#ff6040" />
          </p>
        </div>
        <van-grid :border="false" :column-num="4">
          <van-grid-item v-for="item in brandsList" :key="item.id">
            <van-image :src="item.brandImg" />
            <p class="girdTitle">{{ item.title }}</p>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- 未登录让他去登录 -->
    <div class="imgInfo" v-else>
      <div class="users">
        <img
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimages.669pic.com%2Felement_pic%2F8%2F0%2F87%2F90%2F430fc441585d2fdc1018b7e87d479073.jpg&refer=http%3A%2F%2Fimages.669pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613787247&t=e67de3f011af23b94547cbbb96f1366f"
          alt=""
        />
        <p>xxxx</p>
      </div>
      <div class="btns">
        <van-button @click="$router.push('/login')" type="warning" size="mini"
          >快去登录</van-button
        >
      </div>
    </div>
    <div class="cell">
      <van-cell title="地址管理" icon="location-o" />
      <van-cell title="我的钱包" icon="gold-coin-o" />
      <van-cell title="我的二维码" icon="qr" />
      <van-cell title="我的小伙伴" icon="friends-o" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      brandList: [
        {
          id: 1,
          title: "我的收藏",
          num: 12,
        },
        {
          id: 2,
          title: "浏览记录",
          num: 12,
        },
        {
          id: 3,
          title: "我的红包",
          num: "￥0",
        },
        {
          id: 4,
          title: "优惠券",
          num: 12,
        },
      ],
      brandsList: [
        {
          title: "待付款",
          brandImg: require("@/assets/images/icon/1.png"),
        },
        {
          title: "待收货",
          brandImg: require("@/assets/images/icon/2.png"),
        },
        {
          title: "评价",
          brandImg: require("@/assets/images/icon/3.png"),
        },
        {
          title: "售后/退款",
          brandImg: require("@/assets/images/icon/4.png"),
        },
      ],
    };
  },
  mounted() {
    //把登录信息从存储中取出来
    this.userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : false;
  },
  methods: {
    loginOut() {
      sessionStorage.removeItem("userInfo");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="" scoped>
.van-nav-bar,
.imgInfo {
  background-color: #ff6040;
}
.imgInfo {
  height: 2.1rem;
  padding: 0.1rem 0.1rem;
}
.user {
  display: flex;
  align-items: center;
}
.users {
  text-align: center;
  font-size: .2rem;
  color: #fff;
  margin-top: .3rem;
}
.users img {
  width: 0.64rem;
  height: 0.64rem;
  border-radius: 50%;
}
.user img {
  width: 0.64rem;
  height: 0.64rem;
  border-radius: 50%;
}
.btn {
  margin-left: 0.8rem;
}
.btns {
  margin: 0 auto;
  width: 0.58rem;
  margin-top: .6rem;
}
.nick {
  display: flex;
  height: 0.64rem;
  justify-content: space-evenly;
  flex-direction: column;
  font-size: 0.18rem;
  color: #fff;
  margin-left: 0.1rem;
}
.more {
  font-size: 0.12rem;
  border: 1px solid #fff;
  padding: 0.05rem;
  border-radius: 0.02rem;
}
.mine {
  display: flex;
  padding: 0.2rem 0;
  justify-content: space-evenly;
  text-align: center;
  font-size: 0.18rem;
  color: #fff;
}
.txt {
  font-size: 0.12rem;
}
.order {
  margin: 0 0.2rem;
  height: 1.2rem;
  border-radius: 0.04rem;
  background-color: #fff;
  border: 1px solid #ccc;
}
.title {
  display: flex;
  padding: 0.1rem;
  justify-content: space-between;
}
.left {
  font-size: 0.16rem;
}
.right {
  font-size: 0.12rem;
  color: #ff6040;
}
.cell {
  margin-top: 0.45rem;
}
</style>
