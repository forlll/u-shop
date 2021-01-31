<template>
  <div>
    <el-dialog
      :title="status.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="status.isShow"
      width="45%"
      center
      :before-close="cancel"
    >
      <el-form :model="role" :rules="rules" ref="ruleFrom">
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          prop="rolename"
        >
          <el-input type="text" v-model="role.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            default-expand-all
            :props="{
              children: 'children', //树形层级
              label: 'title', //展示的内容  title指得的是菜单名称
            }"
            ref="tree"
            check-strictly
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="role.status"
            active-color="#409EFF"
            inactive-color="#909399"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
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
import { getRoleList, addRole, lookOneRole, editRole } from "@/uitl/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      role: {
        rolename: "", // 角色名称
        menus: "", //角色权限//菜单权限 存放的是菜单编号，用逗号隔开 '[1,2,3]'
        status: 1, //状态1正常2禁用
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "85px", //label宽度\
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
      getRoleList: "role/getRoleListAction",
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
        this.role.menus = this.$refs.tree.getCheckedKeys().join(",");
        console.log(this.role.menus);
        if (valid) {
          addRole(this.role).then((res) => {
            if (res.data.code === 200) {
              this.cancel();
              this.getRoleList();
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
      this.role = {
        rolename: "", // 角色名称
        menus: "", //角色权限//菜单权限 存放的是菜单编号，用逗号隔开 '[1,2,3]'
        status: 1, //状态1正常2禁用
      };
      if (this.$refs["ruleFrom"] !== undefined) {
        this.$refs["ruleFrom"].resetFields();
      }
    },
    lookUp(id) {
      lookOneRole({
        id,
      }).then((res) => {
        if (res.data.code === 200) {
          this.role = res.data.list;
          this.$refs.tree.setCheckedKeys(this.role.menus.split(","));
          this.role.id = id;
          console.log(this.role.menus);
        }
      });
    },
    edit(formName) {
      this.$refs[formName].validate((valid) => {
        this.role.menus = this.$refs.tree.getCheckedKeys().join(",");
        if (valid) {
          editRole(this.role).then((res) => {
            if (res.data.code === 200) {
              this.cancel();
              this.getRoleList();
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
  mounted() {
    this.getMenuList();
    this.getRoleList();
  },
};
</script>

<style  lang="" scoped>
</style>
