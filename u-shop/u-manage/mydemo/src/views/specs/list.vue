<template>
  <div>
    <el-table :data="specsList" border style="width: 100%" row-key="id" :tree-props="{children: 'children'}" default-expand-all>
      <el-table-column prop="id" label="规格编号" style="width: 20%">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" style="width: 20%">
      </el-table-column>
      <el-table-column label="规格属性" style="width: 20%">
        <template slot-scope="item">
          <div>
            <el-tag class="tag" v-for="attr in item.row.attrs"  type="info" :key='attr'>{{attr}}</el-tag>
          </div>
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
    <el-pagination background layout="prev, pager, next,total" :total="specsCount" :page-size="specsSize" @current-change='changePage'>
    </el-pagination>
  </div>
</template>

<script>
import { delSpecs } from "@/uitl/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
      specsSize:'specs/getSpecsSize',
      specsCount:'specs/getCount'
    })
  },
  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getSpecsCount:'specs/getSpecsCountAction',
      getSpecsPage:'specs/changePageAction'
    }),
    //切换页码触发的事件
    changePage(n){
      console.log(n,'当前页码数');
      this.getSpecsPage(n)
    },
    del(id) {
      this.$confirm("是否确定删除此条规格?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delSpecs({ id }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getSpecsList();
              this.getSpecsCount();
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
    this.getSpecsCount();
  },
};
</script>

<style  lang="stylus" scoped>
.tag{
  margin-right: 5px;
}
.el-pagination
  margin 15px
  float right
</style>
