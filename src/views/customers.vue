<template>
  <div>
    <!--查询-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="用户昵称">
        <el-input placeholder="支持模糊查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="createTime"
        label="创建日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getCustomer} from "../axios/api";

  export default {
    data() {
      return {
        tableData: []
      }
    },
    created(){
      this.getData(1)
    },
    methods:{
      getData:function (current) {
        getCustomer(current).then(res=>{
          console.log(res)
          this.tableData=res.data.records
        })
      }
    }
  }
</script>

<style scoped>

</style>
