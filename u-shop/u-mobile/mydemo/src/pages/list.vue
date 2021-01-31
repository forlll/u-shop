<template>
  <div class="all">
    <van-nav-bar title="小U商城" left-arrow @click-left="$router.back()" />
    <!-- 搜索框 -->
    <van-search
      v-model="searchKey"
      placeholder="请输入搜索关键词"
      background="#FF6040"
    />
    <!-- 导航栏 -->
    <div class="nav-header">
      <van-tabs
        v-model="active"
        background="#ff6040"
        color="#fff"
        line-width="30px"
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
      <div class="sort">
        <van-icon name="filter-o" size="12" color="#fff" />
        筛选
      </div>
    </div>
    <div class="tag">筛选11.11大促商品</div>
    <!-- 商品列表 -->
    <van-list v-if="goodsList.length > 0">
      <van-card
        v-for="item in goodsList"
        :key="item.id"
        :price="item.price.toFixed(2)"
        desc="描述信息"
        :title="item.goodsname"
        :thumb="
          item.img ? $imgUrl + item.img : 'https://img.yzcdn.cn/vant/ipad.jpeg'
        "
        @click="goDetail(item.id)"
      />
    </van-list>
    <!-- 无商品列表 -->
    <van-list v-else><van-empty description="暂无商品" /></van-list>
  </div>
</template>

<script>
import {getGoods} from '../util/axios'
export default {
  data() {
    return {
      active: 0,
      searchKey:'',
      goodsList: [],
      navList: [
        {
          id: 1,
          title: "综合推荐",
        },
        {
          id: 2,
          title: "销量",
        },
        {
          id: 3,
          title: "价格",
        },
        {
          id: 4,
          title: "好评度",
        },
        {
          id: 5,
          title: "店铺",
        },
      ],
    };
  },
  mounted() {
    getGoods({
      fid: this.$route.query.id,
    }).then((res) => {
      if (res.code == 200) {
        this.goodsList = res.list ? res.list : [];
      }
    });
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        path: "/detail",
        query: {
          id
        },
      });
    },
  },
};
</script>

<style lang="" scoped>
.all {
  margin-bottom: 0.5rem;
}
.van-nav-bar,
.nav-header {
  background-color: #ff6040;
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
.tag {
  width: 3.5rem;
  height: 0.32rem;
  line-height: 0.32rem;
  margin: 0 auto;
  border: 1px solid #ff6040;
  text-align: center;
  color: #ff6040;
  font-size: 0.16rem;
  margin-top: 0.1rem;
  background: #fff4f2;
}
</style>
