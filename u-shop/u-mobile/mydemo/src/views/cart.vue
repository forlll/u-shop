<template>
  <div>
      <!-- 顶部 -->
    <van-nav-bar
      title="购物车"
    />
        <!-- 商品列表 -->
    <van-list v-if="cartList.length > 0">
      <van-swipe-cell v-for="item in cartList" :key="item.id">
        <van-card
          :price="item.price.toFixed(2)"
          desc="描述信息"
          :title="item.goodsname"
          :num="item.num"
          :thumb="
            item.img
              ? $imgUrl + item.img
              : ''
          "
        >
          <template #footer>
            <van-stepper
              v-model="item.num"
              theme="round"
              button-size="22"
              disable-input
            />
          </template>
        </van-card>
        <template #right>
          <van-button
            @click="delCart(item.id)"
            square
            text="删除"
            type="danger"
            class="delete-button"
          />
        </template>
      </van-swipe-cell>
    </van-list>
    <!-- 无商品列表 -->
    <van-list v-else
      ><van-empty description="购物车空空如也快去买买买！！！"
    /></van-list>
  </div>
</template>

<script>
//引入接口
import { getCartList, deleteCart } from "../util/axios";
//引入弹框
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      cartList: [],
      num: 1 
    };
  },
  mounted() {
      this.getCartList()
  },
  methods: {
    getCartList() {
      getCartList({
        uid:
          this.$route.query.uid ||
          JSON.parse(sessionStorage.getItem("userInfo")).uid
      }).then(res => {
        if (res.code == 200) {
          this.cartList = res.list ? res.list : [];
        }
      });
    },
    delCart(id) {
      deleteCart({
        id
      }).then(res => {
        if (res.code == 200) {
            this.getCartList()
          Toast.success(res.msg);
        } else {
          Toast.fail(res.msg);
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.getItem("userInfo")) {
      next();
    } else {
      Dialog.confirm({
        title: "未登录",
        message: "还没有登录不能查看购物车哦，快登录！"
      })
        .then(() => {
          next("/login");
        })
        .catch(() => {
          next(from.path);
        });
    }
  }
};
</script>

<style lang="" scoped>
.van-nav-bar{
    background-color: #FF6040;
}
</style>
