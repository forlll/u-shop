<template>
  <div>
    <el-dialog
      :title="status.isAdd ? '添加用户' : '编辑用户'"
      :visible.sync="status.isShow"
      width="45%"
      center
      :before-close="cancel"
    >
      <el-form :model="user" :rules="rules" ref="ruleFrom">
        <el-form-item
          label="所属角色"
          :label-width="formLabelWidth"
          prop="roleid"
        >
          <el-select v-model="user.roleid" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="用户名称"
          prop="username"
          :label-width="formLabelWidth"
        >
          <el-input type="text" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="text" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="user.status"
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
import { getUserList, addUser, lookOneUser, editUser } from "@/uitl/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //1是正常2禁用
      },
      rules: {
        roleid: [{ required: true, message: "请选择角色", trigger: "change" }],
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "85px", //label宽度\
    };
  },
  props: ["status"],
  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
      userList: "manager/getUserList",
    }),
  },
  methods: {
    ...mapActions({
      getRoleList: "role/getRoleListAction",
      getUserList: "manager/getUserListAction",
      getUserCount: "manager/getUserCountAction",
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
          addUser(this.user).then((res) => {
            if (res.data.code == 200) {
              this.cancel();
              this.getUserList();
              this.getUserCount();
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
      this.user = {
        username: "", // 用户名称
        menus: "", //用户权限//菜单权限 存放的是菜单编号，用逗号隔开 '[1,2,3]'
        status: 1, //状态1正常2禁用
      };
      if (this.$refs["ruleFrom"] !== undefined) {
        this.$refs["ruleFrom"].resetFields();
      }
    },
    lookUp(uid) {
      lookOneUser({
        uid,
      }).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.uid = uid;
        }
      });
    },
    edit(formName) {
      // console.log(this.user);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editUser(this.user).then((res) => {
            if (res.data.code === 200) {
              this.cancel();
              this.getUserList();
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
  mounted() {
    this.getRoleList();
    this.getUserList();
  },
};
</script>

<style  lang="" scoped>
</style>
