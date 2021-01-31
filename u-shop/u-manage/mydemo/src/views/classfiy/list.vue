<template>
  <div>
    <el-table :data="cateList" border style="width: 100%" row-key="id" :tree-props="{children: 'children'}" default-expand-all>
      <el-table-column prop="id" label="分类编号" style="width: 20%">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" style="width: 20%">
      </el-table-column>
      <el-table-column label="图片" style="width: 20%">
        <template slot-scope="item">
          <div v-if="item.row.pid !=0">
            <img :src="item.row.img? $imgUrl+item.row.img:''" alt="">
          </div>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" style="width: 20%">
        <template slot-scope="item">
          <div>
            <el-tag type="success" plain v-if="item.row.status==1">启用</el-tag>
            <el-tag type="danger" plain v-else>禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" style="width: 20%">
        <template slot-scope="item">
          <div>
            <el-button type="primary" @click="edit(item.row.id)" size="small"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(item.row.id)" size="small"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { delCate } from "@/uitl/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
  methods: {
    ...mapActions({
      getCateList: "cate/getCateListAction",
    }),
    del(id) {
      this.$confirm("是否确定删除此条分类?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delCate({ id }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getCateList();
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
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.getCateList();
  },
};
</script>

<style  lang="stylus" scoped>
img{
  width 100px
  height 100px
}
</style>
