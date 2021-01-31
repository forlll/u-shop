<template>
  <div class="all">
    <van-nav-bar
      :title="detailList.goodsname"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 导航栏 -->
    <div class="nav-header">
      <van-tabs
        v-model="active"
        background="#ff6040"
        color="#fff"
        line-width="20px"
        title-active-color="#fff"
        title-inactive-color="#fff"
        :ellipsis="false"
      >
        <van-tab
          v-for="item in navList"
          :key="item.id"
          :title="item.title"
        ></van-tab>
      </van-tabs>
    </div>
    <!-- 图片 -->
    <div>
      <img
        class="goodsImg"
        :src="detailList.img ? $imgUrl + detailList.img : ''"
        alt=""
      />
    </div>
    <!-- 商品详情 -->
    <div class="box">
      <!-- 描述 -->
      <div class="priceBox">
        <span class="icon">￥</span>
        <span class="price">{{ detailList.price }}</span>
        <span class="market_price">￥{{ detailList.market_price }}</span>
        <span class="priceInfo">(此价格不与套装优惠同享)</span>
        <div class="star">
          <van-icon name="star-o" size="12" color="#ff6040" />
          <p>收藏</p>
        </div>
      </div>
      <div class="des" v-html="detailList.description"></div>
      <van-cell-group class="num">
        <span>购买数量</span>
        <van-stepper v-model="num" />
      </van-cell-group>
      <van-cell-group class="attr">
        <div class="goodAttr">
          <p>商品属性</p>
          <van-icon name="arrow-down" size="12" color="#333" />
        </div>
        <div>
          <span class="specs"> {{ detailList.specsname }} </span>
          <van-tag v-for="attr in attrList" :key="attr" type="danger">{{
            attr
          }}</van-tag>
        </div>
      </van-cell-group>
      <div>
        <img
          class="goodsImg"
          :src="detailList.img ? $imgUrl + detailList.img : ''"
          alt=""
        />
        <div class="des" v-html="detailList.description"></div>
      </div>
    </div>
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button
        @click="toCart"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button @click="toBuy" type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import { Toast } from "vant";
import { Dialog } from "vant";
import { getGoodsInfo, addCart } from "../util/axios";

export default {
  data() {
    return {
      active: "",
      detailList: [],
      attrList: [],
      num: 0,
      navList: [
        {
          id: 1,
          title: "商品",
        },
        {
          id: 2,
          title: "评价",
        },
        {
          id: 3,
          title: "详情",
        },
        {
          id: 4,
          title: "推荐",
        },
      ],
    };
  },
  mounted() {
    //组件一加载就调取商品详情接口
    getGoodsInfo({
      id: this.$route.query.id,
    }).then((res) => {
      console.log(res, "商品详情");
      if (res.code == 200) {
        this.detailList = res.list[0];
        this.attrList = res.list[0].specsattr
          ? res.list[0].specsattr.split(",")
          : [];
      }
    });
  },
  methods: {
    toCart() {
      if (sessionStorage.getItem("userInfo")) {
        addCart({
          uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
          num: this.num,
          goodsid: this.detailList.id,
        }).then((res) => {
          if (res.code === 200) {
            console.log(res, "成功");
            Toast.success(res.msg);
            //跳转到购物车列表
            this.$router.push({
              path: "/cart",
              query: {
                uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
              },
            });
          }else{
            Toast.fail(res.msg);
          }
        });
      } else {
        this.$router.push("/login");
      }
    },
    toBuy() {
      Dialog.alert({
        message: "暂无订单页！",
      }).then(() => {});
    },
  },
};
</script>

<style lang="" scoped>
.all {
  margin-bottom: 0.5rem;
}
.van-nav-bar {
  background-color: #ff6040;
}
.van-goods-action {
  position: fixed;
  left: 0;
  bottom: 0;
}
.box {
  padding: 0.1rem;
}
.goodsImg {
  width: 100%;
}
.priceBox {
  height: 0.24rem;
  margin-bottom: 0.1rem;
}
.icon {
  color: #ff6040;
  font-size: 0.14rem;
}
.price {
  color: #ff6040;
  font-size: 0.3rem;
}
.market_price {
  font-size: 14px;
  color: #999999;
  line-height: 12px;
  text-decoration: line-through;
}
.priceInfo {
  color: #999;
  font-size: 0.13rem;
}
.star {
  float: right;
  color: #ff6040;
  text-align: center;
}
.des {
  font-size: 0.16rem;
  color: #333;
  margin: 0.05rem 0;
}
.van-cell-group {
  display: flex;
  margin-top: 0.1rem;
  font-size: 0.14rem;
  color: #333;
}
.num {
  align-items: center;
  justify-content: space-between;
  height: 0.4rem;
}
.attr {
  justify-content: space-evenly;
  flex-direction: column;
  height: 0.6rem;
}
.goodAttr {
  display: flex;
  justify-content: space-between;
}
.specs {
  margin-right: 0.4rem;
}
</style>
