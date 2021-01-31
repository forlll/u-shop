<template>
  <div>
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" style="width: 10%">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" style="width: 10%">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" style="width: 10%">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" style="width: 10%">
      </el-table-column>
      <el-table-column label="图片" style="width: 10%">
        <template slot-scope="item">
          <div v-if="item.row.pid !=0">
            <img :src="item.row.img? $imgUrl+item.row.img:''" alt="">
          </div>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品" style="width: 10%">
        <template slot-scope="item">
          <div>
            <el-tag type="success" plain v-if="item.row.isnew==1">是</el-tag>
            <el-tag type="danger" plain v-else>否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" style="width: 10%">
        <template slot-scope="item">
          <div>
            <el-tag type="success" plain v-if="item.row.ishot==1">是</el-tag>
            <el-tag type="danger" plain v-else>否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" style="width: 10%">
        <template slot-scope="item">
          <div>
            <el-tag type="success" plain v-if="item.row.status==1">是</el-tag>
            <el-tag type="danger" plain v-else>否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" style="width: 20%">
        <template slot-scope="item">
          <div>
            <el-button type="primary" @click="edit(item.row.uid)" size="small"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(item.row.uid)" size="small"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next,total" :total="goodsCount" :page-size="goodsSize" @current-change='changePage'>
    </el-pagination>
  </div>
</template>

<script>
import { delGoods } from "@/uitl/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      goodsSize: "goods/getGoodsSize",
      goodsList: "goods/getGoodsList",
      goodsCount:"goods/getCount"
    }),
  },
  methods: {
    ...mapActions({
      getGoodsList: "goods/getGoodsListAction",
      getGoodsCount: "goods/getGoodsCountAction",
      getGoodsPage: "goods/changePageAction",
    }),
    del(uid) {
      this.$confirm("是否确定删除此条菜单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delGoods({ uid }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getGoodsList();
              this.getGoodsCount();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(uid) {
      this.$emit("edit", uid);
    },
    changePage(n){
      this.getGoodsPage(n);
    }
  },
  mounted() {
    this.getGoodsCount();
  },
};
</script>

<style  lang="stylus" scoped>
img{
  width 100px
  height 100px
}
.el-pagination
  margin 15px
  float right
</style>
