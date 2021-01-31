<template>
  <div>
    <el-table :data="menuList" border style="width: 100%" row-key="id" :tree-props="{children: 'children'}" default-expand-all>
      <el-table-column prop="id" label="菜单编号" width="120">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="150">
      </el-table-column>
      <el-table-column prop="pid" label="上级菜单" width="150">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="130">
        <template slot-scope="item">
          <div>
            <i :class="item.row.icon">{{item.icon}}</i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址" width="177">
      </el-table-column>
      <el-table-column prop="status" label="状态" style="width: 25%">
        <template slot-scope="item">
          <div>
            <el-tag type="success" plain v-if="item.row.status==1">启用</el-tag>
            <el-tag type="danger" plain v-else>禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
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
      this.$confirm("是否确定删除此条菜单?", "提示", {
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
