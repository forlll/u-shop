<template>
  <div>
    <el-dialog
      :title="status.isAdd ? '添加分类' : '编辑分类'"
      :visible.sync="status.isShow"
      width="45%"
      center
      :before-close="cancel"
    >
      <el-form :model="cate" :rules="rules" ref="ruleFrom">
        <el-form-item label="上级分类" prop="pid" :label-width="formLabelWidth">
          <el-select v-model="cate.pid" placeholder="请选择上级分类">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="分类名称"
          :label-width="formLabelWidth"
          prop="catename"
        >
          <el-input type="text" v-model="cate.catename"></el-input>
        </el-form-item>
        <el-form-item
          label="图片"
          :label-width="formLabelWidth"
          v-show="this.cate.pid != 0"
        >
          <el-upload
            action="#"
            :auto-upload="false"
            :limit="1"
            :file-list="fileList"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="cate.status"
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
import { addCate, lookOneCate, editCate } from "@/uitl/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      cate: {
        pid: "", //上级分类编号
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      },
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "change" }],
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
      cateList: "cate/getCateList",
    }),
  },
  methods: {
    // 当文件改变时，触发的函数方法
    onChange(file) {
      // console.log(file);
      this.imgUrl = file.raw;
    },
    // 预览时的删除
    handleRemove(file, fileList) {
      this.imgUrl = "";
      this.cate.img = "";
      console.log(file, fileList);
    },
    // 方法预览
    handlePictureCardPreview(file) {
      // console.log(file.url);
      this.dialogImageUrl = this.status.disImg ? file.url:'';
      this.dialogVisible = true;
      console.log(this.dialogImageUrl);
    },
    //文件上传的限制
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    ...mapActions({
      getCateList: "cate/getCateListAction",
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
          this.cate.img = this.imgUrl;
          addCate(this.cate).then((res) => {
            if (res.data.code === 200) {
              this.cancel();
              this.getCateList();
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
      this.cate = {
        pid: 0, //上级分类编号
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      };
      this.fileList=[];
      if (this.$refs['ruleFrom'] !== undefined) {
        this.$refs['ruleFrom'].resetFields();
      }
    },
    lookUp(id) {
      lookOneCate({
        id,
      }).then((res) => {
        if (res.data.code === 200) {
          this.cate = res.data.list;
          this.cate.id = id;
          this.fileList = this.cate.img
            ? [{ url: this.$imgUrl + this.cate.img }]
            : "";
        }
      });
    },
    edit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.cate.img = this.imgUrl ? this.imgUrl : this.cate.img;
          let file = new FormData();
          for (let i in this.cate) {
            file.append(i, this.cate[i]);
          }
          editCate(file).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getCateList();
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
    this.getCateList();
  },
};
</script>

<style  lang="" scoped>
</style>
