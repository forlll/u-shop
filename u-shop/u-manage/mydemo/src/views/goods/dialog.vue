<template>
  <div>
    <el-dialog
      :title="status.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="status.isShow"
      width="45%"
      center
      :before-close="cancel"
      @opened="createEditor"
    >
      <el-form :model="goods" :rules="rules" ref="ruleFrom">
        <el-form-item
          label="一级分类"
          :label-width="formLabelWidth"
          prop="first_cateid"
        >
          <el-select
            v-model="goods.first_cateid"
            placeholder="请选择"
            @change="changeCate(false)"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="二级分类"
          :label-width="formLabelWidth"
          prop="second_cateid"
        >
          <el-select v-model="goods.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品名称"
          prop="goodsname"
          :label-width="formLabelWidth"
        >
          <el-input type="text" v-model="goods.goodsname"></el-input>
        </el-form-item>
        <el-form-item
          prop="price"
          label="商品价格"
          :label-width="formLabelWidth"
        >
          <el-input type="text" v-model.number="goods.price"></el-input>
        </el-form-item>
        <el-form-item
          prop="market_price"
          label="市场价格"
          :label-width="formLabelWidth"
        >
          <el-input type="text" v-model.number="goods.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
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
        <el-form-item
          label="商品规格"
          :label-width="formLabelWidth"
          prop="specsid"
        >
          <el-select
            v-model="goods.specsid"
            placeholder="请选择"
            @change="changeSpecs(false)"
          >
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          prop="specsattr"
        >
          <el-select multiple v-model="goods.specsattr" placeholder="请选择">
            <el-option
              v-for="item in attrArr"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="goods.isnew" :label="1">是</el-radio>
          <el-radio v-model="goods.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="goods.ishot" :label="1">是</el-radio>
          <el-radio v-model="goods.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="goods.status"
            active-color="#409EFF"
            inactive-color="#909399"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="editor"></div>
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
import E from "wangeditor";
import { addGoods, lookOneGoods, editGoods } from "@/uitl/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      editor: "null",
      des: "",
      goods: {
        id: "", //分类编号，必填项
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1, //状态1正常2禁用
      },
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "商品价格必须为数字" },
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
          { type: "number", message: "市场价格必须为数字" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
      },
      formLabelWidth: "85px", //label宽度\
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
      secondArr: [], //二级分类数组
      attrArr: [], //规格属性的数组
    };
  },
  props: ["status"],
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
      specsList: "specs/getSpecsList",
      goodsList: "goods/getGoodsList",
    }),
  },
  methods: {
    ...mapActions({
      getCateList: "cate/getCateListAction",
      getSpecsList: "specs/getSpecsListAction",
      getGoodsList: "goods/getGoodsListAction",
      getGoodsCount: "goods/getGoodsCountAction",
    }),
    changeCate(state) {
      let index = this.cateList.findIndex((item) => {
        return this.goods.first_cateid == item.id;
      });
      this.secondArr = this.cateList[index].children;
      if (!state) {
        this.goods.second_cateid = "";
      }
    },
    changeSpecs(state) {
      let index = this.specsList.findIndex((item) => {
        // console.log(this.goods.specsid,item.id);
        return this.goods.specsid == item.id;
      });
      this.attrArr = this.specsList[index].attrs;
      if (!state) {
        this.goods.specsattr = "";
      }
    },
    createEditor() {
      //实例化富文本编辑器
      this.editor = new E("#editor");
      this.editor.create();
      //初始化之后每次都重新赋空
      this.editor.txt.html(this.des);
      //取值 this.editor.txt.html()
    },
    // 当文件改变时，触发的函数方法
    onChange(file) {
      console.log(file);
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
      console.log(file.url);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
      this.goods.img = this.imgUrl;
      this.goods.specsattr = this.goods.specsattr
        ? this.goods.specsattr.join(",")
        : "";
      this.goods.description = this.editor.txt.html();
      // console.log(this.goods);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addGoods(this.goods).then((res) => {
            if (res.data.code === 200) {
              this.cancel();
              this.getGoodsList();
              this.getGoodsCount();
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
      this.goods = {
        id: "", //分类编号，必填项
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1, //状态1正常2禁用
      };
      this.fileList=[];
      if (this.$refs["ruleFrom"] !== undefined) {
        this.$refs["ruleFrom"].resetFields();
      }
    },
    lookUp(id) {
      lookOneGoods({
        id,
      }).then((res) => {
        if (res.data.code === 200) {
          this.goods = res.data.list;
          this.goods.id = id;
        }
        this.fileList = this.goods.img
          ? [{ url: this.$imgUrl + this.goods.img }]
          : "";
      });
    },
    edit(formName) {
      // console.log(this.goods);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.goods.img = this.imgUrl ? this.imgUrl : this.goods.img;
          let file = new FormData();
          for (let i in this.goods) {
            file.append(i, this.goods[i]);
          }
          editGoods(file).then((res) => {
            if (res.data.code === 200) {
              this.cancel();
              this.getGoodsList();
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
    this.getCateList();
    this.getSpecsList();
    this.getGoodsList();
  },
};
</script>

<style  lang="" scoped>
</style>
