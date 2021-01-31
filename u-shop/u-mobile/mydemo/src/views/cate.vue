<template>
  <div>
    <!-- 顶部 -->
    <van-nav-bar title="分类" />
    <!-- 搜索框 -->
    <van-search
      v-model="searchKey"
      placeholder="请输入搜索关键词"
      background="#FF6040"
    />
    <div class="container">
      <!-- 侧边栏 -->
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          v-for="item in cateList"
          :key="item.id"
          :title="item.catename"
        />
      </van-sidebar>
      <!-- 选中分类宫格 -->
      <van-grid :border="false" :column-num="3" :gutter="10">
        <van-grid-item v-for="item in secondList" :key="item.id" :to="'/list?id='+item.id">
          <van-image :src="item.img ? $imgUrl + item.img : ''" />
          <p class="catename">{{ item.catename }}</p>
        </van-grid-item>
      </van-grid>
      <div class="sort">
        <van-icon name="apps-o" size="12" color="#fff" />
        筛选
      </div>
    </div>
  </div>
</template>

<script>
import { getCateList } from "../util/axios";
export default {
  data() {
    return {
      searchKey: "",
      activeKey: "",
      cateList: [],
      secondList: [],
    };
  },
  mounted() {
    this.getCateInfo();
  },
  methods: {
    onChange() {
      console.log(this.activeKey);
      this.secondList = this.cateList[this.activeKey].children;
    },
    getCateInfo() {
      getCateList().then((res) => {
        if (res.code == 200) {
          //一级分类
          this.cateList = res.list;
          //二级分类
          this.secondList = res.list[0].children;
        }
        console.log(res.list, "分类列表");
      });
    },
  },
};
</script>

<style lang="" scoped>
.van-nav-bar {
  background-color: #ff6040;
  color: #fff;
}
.container {
  display: flex;
}
.van-sidebar {
  flex: 1;
  color: #999;
}
.van-grid {
  flex: 2;
  padding: 0 !important;
  margin: 0.1rem;
}
.catename {
  margin-top: 0.05rem;
  color: #999;
}
</style>
