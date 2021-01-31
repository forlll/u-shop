<template>
  <div>
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" style="width: 20%">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" style="width: 20%">
      </el-table-column>
      <el-table-column prop="roleid" label="所属角色" style="width: 20%">
      </el-table-column>
      <el-table-column prop="status" label="状态" style="width: 25%">
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
    <el-pagination background layout="prev, pager, next,total" :total="userCount" :page-size="userSize" @current-change='changePage'>
    </el-pagination>
  </div>
</template>

<script>
import { delUser } from "@/uitl/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userSize: "manager/getUserSize",
      userList: "manager/getUserList",
      userCount:"manager/getCount"
    }),
  },
  methods: {
    ...mapActions({
      getUserList: "manager/getUserListAction",
      getUserCount: "manager/getUserCountAction",
      getUserPage: "manager/changePageAction",
    }),
    del(uid) {
      this.$confirm("是否确定删除此条菜单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ uid }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getUserList();
              this.getUserCount();
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
      this.getUserPage(n);
    }
  },
  mounted() {
    this.getUserCount();
    console.log(this.userCount,"总数");
    console.log(this.userSize,"pageSize");
  },
};
</script>

<style  lang="stylus" scoped>
.el-pagination
  margin 15px
  float right
</style>
