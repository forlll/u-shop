<template>
  <div>
    <el-dialog
      :title="status.isAdd ? '添加规格' : '编辑规格'"
      :visible.sync="status.isShow"
      width="45%"
      center
      :before-close="cancel"
    >
      <el-form :model="specs" :rules="rules" ref="ruleFrom">
        <el-form-item
          label="规格名称"
          :label-width="formLabelWidth"
          prop="specsname"
        >
          <el-input type="text" v-model="specs.specsname"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in attrArr"
          :key="index"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-input
            class="inpClass"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index === 0" @click="addAttr" type="primary"
            >新增规格属性</el-button
          >
          <el-button @click="delAttr(item)" v-else type="danger"
            >删除</el-button
          >
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="specs.status"
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
import { addSpecs, lookOneSpecs, editSpecs } from "@/uitl/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      specs: {
        specsname: "", //商品规格名称
        attrs: "", //商品规格属性值
        status: 1, //状态1正常2禁用
      },
      //动态表单项
      attrArr: [
        {
          value: "",
        },
      ],
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级规格", trigger: "change" }],
      },
      formLabelWidth: "85px", //label宽度\
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      imgUrl: "", // 文件图片的配置对象
      fileList: [], // 文件列表
    };
  },
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
    }),
  },
  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getSpecsCount: "specs/getSpecsCountAction"
    }),
    //封装一个动态添加表单项
    addAttr() {
      //最多只能添加6次
      if (this.attrArr.length <= 6) {
        //给attrArr 动态添加数据
        this.attrArr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多只能添加6个输入框");
      }
    },
    // //删除动态表单项
    delAttr(item) {
      var index = this.attrArr.indexOf(item);
      if (index !== -1) {
        this.attrArr.splice(index, 1);
      }
    },
    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.status.isAdd,
      });
      this.reset();
    },
    sureAdd(formName) {
      this.$refs[formName].validate((valid) => {
        this.specs.attrs = this.attrArr.map(item => item.value).join(',');
        if (valid) {
          addSpecs(this.specs).then((res) => {
            if (res.data.code == 200) {
              this.cancel();
              this.getSpecsList();
              this.getSpecsCount();
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
      this.specs = {
        pid: 0, //上级规格编号
        specsname: "", //商品规格名称
        img: "", //图片(文件，一般用于二级规格)
        status: 1, //状态1正常2禁用
      };
      this.attrArr=[{
        value:''
      }]
      if (this.$refs['ruleFrom'] !== undefined) {
        this.$refs['ruleFrom'].resetFields();
      }
    },
    lookUp(id) {
      lookOneSpecs({
        id,
      }).then((res) => {
        if (res.data.code === 200) {
          this.specs = res.data.list[0];
          this.specs.id = id;
          this.specs.attrs.map((item,index)=>{
            if(index==0){
              this.attrArr[0].value=item;
            }else{
              this.attrArr.push({
                value:item
              })
            }
          })
        }
      });
    },
    edit(formName) {
      this.$refs[formName].validate((valid) => {
        this.specs.attrs = this.attrArr.map(item => item.value).join(',');
        console.log(this.specs);
        if (valid) {
          editSpecs(this.specs).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getSpecsList();
              //重新调取下总数（当你添加成功，分页也要跟着变化，只有总数变化之后，分页才能跟着变化）
              this.getSpecsCount();
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
    this.getSpecsList();
  },
};
</script>

<style  lang="" scoped>
.inpClass {
  width: 75%;
}
</style>
