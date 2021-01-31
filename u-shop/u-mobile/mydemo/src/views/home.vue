<template>
  <div class="all">
    <!-- 顶部 -->
    <van-nav-bar title="小U商城" left-arrow  @click-left="$router.back()"/>
    <!-- 导航栏 -->
    <div class="nav-title">
      <van-icon name="location-o" size="24" color="#fff" />
      <img src="../assets/images/logo.png" alt="" />
      <van-search
        v-model="searchKey"
        placeholder="请输入搜索关键词"
        background="#FF6040"
      />
      <van-icon name="shop-o" size="24" color="#fff" />
    </div>
    <div class="nav-header">
      <van-tabs
        v-model="active"
        background="#ff6040"
        color="#fff"
        line-width="20px"
        title-active-color="#fff"
        title-inactive-color="#fff"
      >
        <van-tab
          v-for="item in navList"
          :key="item.id"
          :title="item.title"
        ></van-tab>
      </van-tabs>
      <div class="sort">
        <van-icon name="apps-o" size="12" color="#fff" />
        分类
      </div>
    </div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="#fff">
      <van-swipe-item v-for="item in bannerList" :key="item.id">
        <img class="bannerImg" :src="$imgUrl + item.img" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 宫格 -->
    <van-grid :border="false" :column-num="5">
      <van-grid-item v-for="item in brandList" :key="item.id">
        <van-image :src="item.brandImg" />
        <p class="girdTitle">{{ item.title }}</p>
      </van-grid-item>
    </van-grid>
    <!-- 活动 -->
    <div class="sale">
      <div class="left">
        <img :src="saleKill.img" alt="" />
        <div class="text">
          <div class="top">
            <p class="title">{{ saleKill.title }}</p>
            <span class="more">查看更多&gt;</span>
          </div>
          <p class="express">{{ saleKill.express }}</p>
          <div class="activity">
            <span>05</span> : <span>20</span> :
            <span>48</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div v-for="item in saleBanner" :key="item.id" class="saleBanner">
          <img :src="item.img" alt="" />
          <div class="text">
            <p class="title">{{ item.title }}</p>
            <p class="express">{{ item.express }}</p>
            <div class="activity">
              <span>{{ item.activity }}&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 选项卡 -->
    <van-tabs v-model="active1">
      <van-tab title="热卖商品">
        <van-card
          v-for="hotGoods in hotList"
          :key="hotGoods.id"
          :price="hotGoods.price.toFixed(2)"
          desc="描述信息"
          :title="hotGoods.goodsname"
          :thumb="
            hotGoods.img
              ? $imgUrl + hotGoods.img
              : 'https://img.yzcdn.cn/vant/ipad.jpeg'
          "
        />
      </van-tab>
      <van-tab title="新品特卖">
        <van-card
          v-for="newGoods in newList"
          :key="newGoods.id"
          :price="newGoods.price.toFixed(2)"
          desc="描述信息"
          :title="newGoods.goodsname"
          :thumb="
            newGoods.img
              ? $imgUrl + newGoods.img
              : 'https://img.yzcdn.cn/vant/ipad.jpeg'
          "
        />
      </van-tab>
      <van-tab title="所有商品">
        <van-card
          v-for="goods in goodsList"
          :key="goods.id"
          :price="goods.price.toFixed(2)"
          desc="描述信息"
          :title="goods.goodsname"
          :thumb="
            goods.img
              ? $imgUrl + goods.img
              : 'https://img.yzcdn.cn/vant/ipad.jpeg'
          "
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
//引入axios的核心库
import axios from "axios";
//引入接口文档
import { getBanner, getIndexGoodsList } from "../util/axios";
export default {
  data() {
    return {
      active: "",
      active1:'',
      searchKey: "",
      bannerList: [], //轮播图
      hotList: [], //热门商品
      newList: [], //最新商品
      goodsList: [], //所有商品
      navList: [
        {
          id: 1,
          title: "推荐",
        },
        {
          id: 2,
          title: "女装",
        },
        {
          id: 3,
          title: "鞋包",
        },
        {
          id: 4,
          title: "居家",
        },
        {
          id: 5,
          title: "母婴",
        },
        {
          id: 6,
          title: "美妆",
        },
      ], //导航栏
      brandList: [
        {
          title: "限时秒杀",
          brandImg: require("@/assets/images/icon/seckill.png"),
        },
        {
          title: "畅销商品",
          brandImg: require("@/assets/images/icon/top.png"),
        },
        {
          title: "品质大牌",
          brandImg: require("@/assets/images/icon/brand.png"),
        },
        {
          title: "小U自营",
          brandImg: require("@/assets/images/icon/selfsupport.png"),
        },
        {
          title: "积分商城",
          brandImg: require("@/assets/images/icon/integral.png"),
        },
      ],
      saleKill: {
        id: 1,
        title: "限时秒杀",
        img: require("@/assets/images/pic/big.png"),
        express: "每天0点场，好货秒不停",
        activity: "",
      },
      saleBanner: [
        {
          id: 1,
          title: "品牌上新",
          img: require("@/assets/images/pic/small.png"),
          express: "9点整，抢大牌",
          activity: "疯抢红包",
        },
        {
          id: 2,
          title: "日用好物",
          img: require("@/assets/images/pic/02.png"),
          express: "愿君多采撷",
          activity: "塞满奖券",
        },
      ],
    };
  },
  mounted() {
    axios.all([getBanner(), getIndexGoodsList()]).then(
      axios.spread((bannerList, goodsList) => {
        console.log(bannerList, "轮播图列表");
        console.log(goodsList, "商品列表");
        //轮播图
        if (bannerList.code == 200) {
          this.bannerList = bannerList.list;
        }
        //商品列表
        if (goodsList.code == 200) {
          this.hotList = goodsList.list[0].content;
          this.newList = goodsList.list[1].content;
          this.goodsList = goodsList.list[2].content;
        }
      })
    );
  },
};
</script>

<style lang="" scoped>
.all {
  margin-bottom: 0.5rem;
}
.van-nav-bar,
.nav-title,
.nav-header {
  background-color: #ff6040;
}
.nav-title {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 0.5rem;
}
.nav-header,
.sort {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 0.4rem;
}
.sort {
  width: 0.65rem;
  height: 0.44rem;
  background-color: #ff6040;
  color: #fff;
  font-size: 0.14rem;
}
.nav-title img {
  width: 0.9rem;
}
.bannerImg {
  width: 100%;
  height: 1.95rem;
}
.girdTitle {
  color: #333;
  margin-top: 0.05rem;
}
.sale {
  height: 1.75rem;
  padding: 0.1rem;
  display: flex;
  justify-content: space-between;
}
.sale .text {
  position: absolute;
  left: 0.1rem;
  top: 0.1rem;
  z-index: 1;
}
.sale .text .title {
  font-size: 0.16rem;
}
.sale .text .express {
  margin-top: 0.1rem;
}
.sale .text .activity {
  margin-top: 0.05rem;
  text-align: center;
  color: #fff;
}
.sale .left {
  position: relative;
  width: 1.75rem;
  height: 1.75rem;
  color: #85a642;
}
.sale .left img {
  position: absolute;
  left: 0;
  top: 0;
}
.sale .left .top {
  display: flex;
  align-items: center;
}
.sale .left .top .title {
  margin-right: 0.38rem;
}
.sale .left .top .more {
  color: #333;
}
.sale .left .activity {
  display: flex;
  justify-content: space-between;
  width: 0.58rem;
}
.sale .left .activity span {
  width: 0.16rem;
  height: 0.18rem;
  background-image: linear-gradient(180deg, #85a642 0%, #b1cc7a 100%);
  border-radius: 1px;
  text-align: center;
  line-height: 0.18rem;
}
.sale .right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.sale .right .saleBanner {
  position: relative;
  width: 1.75rem;
  height: 0.85rem;
}
.sale .right .saleBanner .activity {
  width: 0.7rem;
  height: 0.2rem;
  line-height: 0.2rem;
}
.sale .right .saleBanner .activity span {
  display: block;
  border-radius: 2px 12px 12px 2px;
}
.sale .right .saleBanner img {
  position: absolute;
  left: 0;
  top: 0;
}
.sale .right .saleBanner:nth-of-type(1) {
  color: #ff6040;
}
.sale .right .saleBanner:nth-of-type(1) span {
  background-image: linear-gradient(180deg, #ff6040 0%, #ff9f80 100%);
}
.sale .right .saleBanner:nth-of-type(2) {
  color: #af40ff;
}
.sale .right .saleBanner:nth-of-type(2) span {
  background-image: linear-gradient(180deg, #af40ff 0%, #f58cff 100%);
}
</style>
