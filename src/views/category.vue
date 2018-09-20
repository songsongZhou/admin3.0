<template>
  <div>
    <!--查询-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="分类名称">
        <el-input v-model="formInline.name" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible = true">添加分类</el-button>
      </el-form-item>
    </el-form>
    <!--表格数据-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="icon"
        label="图标"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="{id = scope.row.id,dialogVisible=true}" type="text" size="small">删除</el-button>
          <el-button type="text"
                     size="small"
                     @click="{dialogFormVisible=true,id=scope.row.id,name=scope.row.name,icon=scope.row.icon,sort=scope.row.sort}">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加用户-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules='rules' ref="form">
        <el-form-item label="类名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <el-input v-model="form.icon" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form.sort" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!--删除用户提示-->
    <el-dialog
      title="警告⚠️"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确定删除该分类？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="del()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getCategorys,delCategory,addOrUpdateCategory} from "../axios/api";

  export default {
    data(){
      return{
        tableData:[],
        id:'',
        formInline:{
          name:''
        },
        form:{
          id:'',
          name:'',
          icon:'',
          sort:''
        },
        rules:{
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ]
        },
        formLabelWidth: '120px',
        dialogFormVisible:false,
        dialogVisible:false,
      }
    },
    created(){
      this.getData(1)
    },
    methods:{
      getData:function (current) {
        getCategorys(current).then(res=>{
          this.tableData=res.data.records
        })
      },
      add:function(){
        addOrUpdateCategory(this.form.id,this.form.name,this.form.icon,this.form.sort).then(res=>{
          this.$message({
            message:res.data.msg,
            type:res.data.code==1?'success':'error'
          })
        })
      },
      del:function () {
        delCategory(this.id).then(res=>{
          this.$message({
            message:res.data.msg,
            type:res.data.code==1?'success':'error'
          })
        })
      },
      onSubmit:function () {

      }
    }
  }
</script>

<style scoped>

</style>
