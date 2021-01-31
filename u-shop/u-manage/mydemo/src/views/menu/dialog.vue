<template>
  <div>
    <el-dialog
      :title="status.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="status.isShow"
      width="45%"
      center
      :before-close="cancel"
    >
      <el-form :model="menu" :rules="rules" ref="ruleFrom">
        <el-form-item
          label="菜单名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input type="text" v-model="menu.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="pid" :label-width="formLabelWidth">
          <el-select v-model="menu.pid" placeholder="请选择上级菜单">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="menu.type" :label="1">目录</el-radio>
          <el-radio v-model="menu.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          v-if="menu.type == 1"
          label="菜单图标"
          :label-width="formLabelWidth"
        >
          <el-select v-model="menu.icon" placeholder="请选择">
            <el-option v-for="item in iconList" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="菜单地址" :label-width="formLabelWidth">
          <!-- 循环path地址列表供用户选择 -->
          <el-select v-model="menu.url" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
              {{ item.name }}</el-option
            >
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="menu.status"
            active-color="#409EFF"
            inactive-color="#909399"
            :active-value="1"
            :inactive-value="2"
          >
            `</el-switch
          >
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="status.isAdd" type="info" @click="sureAdd('ruleFrom')"
          >确 定</el-button
        >
        <el-button v-else type="info" @click="edit('ruleFrom')"
          >编 辑</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuList, addMenu, lookOneMenu, editMenu } from "@/uitl/axios";
import { mapGetters, mapActions } from "vuex";
import { indexRouters } from "@/router";
export default {
  data() {
    return {
      menu: {
        pid: "", //上级分类编号
        title: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 4, max: 5, message: "长度在 4 到 8 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
      },
      formLabelWidth: "85px", //label宽度\
      iconList: [
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods",
      ],
      indexRouters,
    };
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
    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.status.isAdd,
      });
      this.reset();
    },
    sureAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addMenu(this.menu).then((res) => {
            if (res.data.code == 200) {
              this.cancel();
              this.getMenuList();
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("错误！！！");
          return false;
        }
      });
    },
    reset() {
      this.menu = {
        pid: "", //上级分类编号
        title: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      };
      if (this.$refs["ruleFrom"] !== undefined) {
        this.$refs["ruleFrom"].resetFields();
      }
    },
    lookUp(id) {
      lookOneMenu({
        id,
      }).then((res) => {
        if (res.data.code === 200) {
          this.menu = res.data.list;
          this.menu.id = id;
        }
      });
    },
    edit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editMenu(this.menu).then((res) => {
            if (res.data.code === 200) {
              this.cancel();
              this.getMenuList();
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("验证失败！");
          return false;
        }
      });
    },
  },
  props: ["status"],
};
</script>

<style  lang="" scoped>
</style>
