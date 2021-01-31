<template>
  <div>
    <h1>
      <el-bread></el-bread>
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
        isShow:false
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
    edit(e){
      this.status.isShow=true;
      this.$refs.dialogEdit.lookUp(e);
    }
  },
};
</script>

<style  lang="stylus" scoped>
.el-button
  margin-bottom 15px
</style>
