<template>
  <div>
    <el-dialog
      :title="编辑会员"
      :visible.sync="status.isShow"
      width="45%"
      center
      :before-close="cancel"
    >
      <el-form :model="member" :rules="rules" ref="ruleFrom">
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="nickname"
        >
          <el-input type="text" v-model="member.nickname"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input type="text" v-model="member.phone"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input type="password" v-model="member.password"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="member.status"
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
        <el-button  type="info" @click="edit('ruleFrom')"
          >编 辑</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addMember, editMember } from "@/uitl/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      member: {
        uid:'',//会员编号，必填项
        nickname:'',//昵称
        phone:'',//手机号
        password:'',//密码
        status:1,//状态1正常2禁用
      },
      rules: {
        nickname: [
          { required: true, message: "请输入会员名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 4 到 8 个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号称", trigger: "blur" },
          { min: 11, max: 11, message: "长度是11个字符", trigger: "blur" },
        ],
        password:[
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" },
        ]
      },
      formLabelWidth: "85px", //label宽度\
    };
  },
  computed: {
    ...mapGetters({
      memberList: "member/getMemberList",
    }),
  },
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListAction",
    }),
    cancel() {
      this.$emit("cancel", {
        isShow: false
      });
      this.reset();
    },
    reset() {
      this.member = {
        uid:'',//会员编号，必填项
        nickname:'',//昵称
        phone:'',//手机号
        password:'',//密码
        status:1,//状态1正常2禁用
      };
      if (this.$refs["ruleFrom"] !== undefined) {
        this.$refs["ruleFrom"].resetFields();
      }
    },
    edit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editMember(this.member).then((res) => {
            if (res.data.code === 200) {
              this.cancel();
              this.getMemberList();
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
