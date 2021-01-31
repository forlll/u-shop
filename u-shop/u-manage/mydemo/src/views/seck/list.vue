<template>
  <div>
    <el-table :data="seckList" border style="width: 100%" row-key="id" :tree-props="{children: 'children'}" default-expand-all>
      <el-table-column prop="title" label="活动名称" style="width: 40%">
      </el-table-column>
      <el-table-column prop="status" label="状态" style="width: 30%">
        <template slot-scope="item">
          <div>
            <el-tag type="success" plain v-if="item.row.status==1">启用</el-tag>
            <el-tag type="danger" plain v-else>禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" style="width: 30%">
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
import { delSeck } from "@/uitl/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      seckList: "seck/getSeckList",
    }),
  },
  methods: {
    ...mapActions({
      getSeckList: "seck/getSeckListAction",
    }),
    del(id) {
      this.$confirm("是否确定删除此条活动?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delSeck({ id }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getSeckList();
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
    this.getSeckList();
  },
};
</script>

<style  lang="stylus" scoped></style>
