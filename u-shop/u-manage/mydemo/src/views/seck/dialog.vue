<template>
  <div>
    <el-dialog
      :title="status.isAdd ? '添加秒杀活动' : '编辑秒杀活动'"
      :visible.sync="status.isShow"
      width="45%"
      center
      :before-close="cancel"
    >
      <el-form :model="seck" :rules="rules" ref="ruleFrom">
        <el-form-item
          label="活动名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input type="text" v-model="seck.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="一级分类">
          <el-select v-model="seck.first_cateid" @change="changeCate(false)">
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="二级分类">
          <el-select v-model="seck.second_cateid" @change="changeGoods(false)">
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="商品">
          <el-select v-model="seck.goodsid">
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="seck.status"
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
import { addSeck, lookOneSeck, editSeck, getGoodsList } from "@/uitl/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      time: "",
      secondArr: [],
      goodsArr: [],
      seck: {
        id: "", //编号，必填项
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入秒杀活动名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "85px", //label宽度\
    };
  },
  computed: {
    ...mapGetters({
      seckList: "seck/getSeckList",
      cateList: "cate/getCateList",
    }),
  },
  mounted() {
    this.getCateList();
  },
  methods: {
    ...mapActions({
      getSeckList: "seck/getSeckListAction",
      getCateList: "cate/getCateListAction",
    }),
    changeCate(state) {
      let index = this.cateList.findIndex((item) => {
        return this.seck.first_cateid == item.id;
      });
      this.secondArr = this.cateList[index].children;
      if (!state) {
        this.seck.second_cateid = "";
      }
    },
    changeGoods(state) {
      getGoodsList({
        fid: this.seck.first_cateid,
        sid: this.seck.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.goodsArr = res.data.list ? res.data.list : [];
        }
      });
      if (!state) {
        this.seck.goodsid = "";
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
        if (valid) {
          this.seck.begintime = new Date(this.time[0]).getTime();
          this.seck.endtime = new Date(this.time[0]).getTime();
                    console.log(this.seck);
          addSeck(this.seck).then((res) => {
            if (res.data.code == 200) {
              this.cancel();
              this.getSeckList();
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
      this.seck = {
        id: "", //编号，必填项
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态1正常2禁用
      };
      this.time = "";
      if (this.$refs["ruleFrom"] !== undefined) {
        this.$refs["ruleFrom"].resetFields();
      }
    },
    lookUp(id) {
      lookOneSeck({
        id,
      }).then((res) => {
        if (res.data.code === 200) {
          this.seck = res.data.list;
          this.seck.id = id;
          this.time = [
            new Date(parseFloat(this.seck.begintime)),
            new Date(parseFloat(this.seck.endtime)),
          ];
          this.changeCate(true);
          this.changeGoods(true);
        }
      });
    },
    edit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editSeck(this.seck).then((res) => {
            if (res.data.code === 200) {
              this.cancel();
              this.getSeckList();
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
