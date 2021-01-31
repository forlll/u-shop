<template>
  <div>
    <h1>
      <el-bread></el-bread>
      <el-button size="small" type="info" plain @click="toOpen">添加</el-button>
      <list-table @edit="edit"></list-table>
      <add-dialog ref="dialogEdit" @cancel="cancel" :status="status" ></add-dialog>
    </h1>
  </div>
</template>

<script>
import listTable from './list'
import addDialog from './dialog'
export default {
  data() {
    return {
      status:{
        isShow:false,
        isAdd:false
      }
      
    };
  },
  components:{
    listTable,
    addDialog
  },
  methods: {
    cancel(e){
      this.status = e;
    },
    toOpen(){
      this.status.isShow=true;
      this.status.isAdd=true;
    },
    edit(e){
      this.status.isShow=true;
      this.status.isAdd=false;
      this.$refs.dialogEdit.lookUp(e);
    }
  },
};
</script>

<style  lang="stylus" scoped>
.el-button
  margin-bottom 15px
</style>
