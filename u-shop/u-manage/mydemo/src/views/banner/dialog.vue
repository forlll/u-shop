<template>
  <div>
    <el-dialog
      :title="status.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="status.isShow"
      width="45%"
      center
      :before-close="cancel"
    >
      <el-form :model="banner" :rules="rules" ref="ruleFrom">
        <el-form-item
          label="轮播图标题"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input type="text" v-model="banner.title"></el-input>
        </el-form-item>
        <el-form-item
          label="图片"
          :label-width="formLabelWidth"
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
            v-model="banner.status"
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
import { addBanner, lookOneBanner, editBanner } from "@/uitl/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      banner: {
        id: "", //分类编号，必填项
        title: "", //轮播图名称
        img: "", //图片(文件)
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" },
        ]
      },
      formLabelWidth: "95px", //label宽度\
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      imgUrl: "", // 文件图片的配置对象
      fileList: [], // 文件列表
    };
  },
  computed: {
    ...mapGetters({
      bannerList: "banner/getBannerList",
    }),
  },
  methods: {
    ...mapActions({
      getBannerList: "banner/getBannerListAction",
    }),
    // 当文件改变时，触发的函数方法
    onChange(file) {
      // console.log(file);
      this.imgUrl = file.raw;
    },
    // 预览时的删除
    handleRemove(file, fileList) {
      this.imgUrl = "";
      this.banner.img = "";
      console.log(file, fileList);
    },
    // 方法预览
    handlePictureCardPreview(file) {
      // console.log(file.url);
      this.dialogImageUrl = this.status.disImg ? file.url : "";
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
    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.status.isAdd,
      });
      this.reset();
    },
    sureAdd(formName) {
      this.banner.img = this.imgUrl;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addBanner(this.banner).then((res) => {
            if (res.data.code == 200) {
              this.cancel();
              this.getBannerList();
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
      this.banner = {
        id: "", //分类编号，必填项
        title: "", //轮播图名称
        img: "", //图片(文件)
        status: "", //状态1正常2禁用
      };
      if (this.$refs["ruleFrom"] !== undefined) {
        this.$refs["ruleFrom"].resetFields();
      }
    },
    lookUp(id) {
      lookOneBanner({
        id,
      }).then((res) => {
        if (res.data.code === 200) {
          this.banner = res.data.list;
          this.banner.id = id;
          this.fileList = this.banner.img
            ? [{ url: this.$imgUrl + this.banner.img }]
            : "";
        }
      });
    },
    edit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.banner.img = this.imgUrl ? this.imgUrl : this.banner.img;
          let file = new FormData();
          for (let i in this.banner) {
            file.append(i, this.banner[i]);
          }
          editBanner(file).then((res) => {
            if (res.data.code === 200) {
              this.cancel();
              this.getBannerList();
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
