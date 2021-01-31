<template>
  <div>
    <el-table :data="memberList" border style="width: 100%" row-key="id" default-expand-all>
      <el-table-column prop="uid" label="用户编号" style="width: 20%">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" style="width: 20%">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" style="width: 20%">
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
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { delMenu, updateMenu } from "@/uitl/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    del(id) {
      this.$confirm("是否确定删除此条会员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMenu({ id }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getMenuList();
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
    this.getMenuList();
  },
};
</script>

<style  lang="stylus" scoped></style>
