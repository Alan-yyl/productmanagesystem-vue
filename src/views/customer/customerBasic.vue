<template>
  <div class="basicInfo">
    <div>
      <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchValue"
          style="width: 350px;margin:10px 0"
      >
      </el-input>
      <el-button round style="margin-left: 10px" @click="search(true)">搜索</el-button>
      <el-button round @click="showAdvanceSearchView = !showAdvanceSearchView">
        <i :class="showAdvanceSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'"
           aria-hidden="true"></i>
        高级搜索
      </el-button>
      <el-button round style="margin-left: 10px" @click="searchConditionReset">重置</el-button>
      <el-button round style="margin-left: 400px" @click="addProduct">新增</el-button>
      <transition name="slide-fade">
        <div v-show="showAdvanceSearchView"
             style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding: 5px;margin: 10px 0px;">
          <el-row >
            <el-col :span="5">
              顾客姓名:
              <el-input v-model="advanceSearch.personName" placeholder="请输入内容" style="width: 150px"
                        size="small"></el-input>
            </el-col>
            <el-col :span="10">
              顾客地址:
              <el-input v-model="advanceSearch.address" placeholder="请输入内容" style="width: 300px" size="small"></el-input>
            </el-col>
          </el-row>
        </div>
      </transition>
    </div>
    <el-table
        @row-click="openDetails"
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="personId"
          label="编号"
          width="100">
      </el-table-column>
      <el-table-column
          prop="personName"
          label="姓名"
          width="400">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址"
          width="500">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
    <el-dialog title="顾客信息" :visible.sync="dialogTableVisible" width="80%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="顾客姓名">
              <el-input v-model="form.personName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-show="isNeedId">
            <el-form-item label="顾客编号">
              <el-input v-model="form.personId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="顾客地址">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">完成</el-button>
          <el-button @click="dialogTableVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>


export default {
  name: "customerBasic",

  methods: {
    searchConditionReset(){
      this.searchValue= "";
      //高级搜索条件
      this.advanceSearch={
        personName: "",
        address: ""
      };
      this.refresh();
    },

    //搜索
    search(reset) {
      if (reset){
        this.currentPage=1;
      }

      let url = "/customerBasic/?pageNum=" + this.currentPage + "&pageSize=" + this.pageSize;


      if (this.advanceSearch.personName) {
        url += "&personName=" + this.advanceSearch.personName;
      }
      if (this.advanceSearch.address) {
        url += "&address=" + this.advanceSearch.address;
      }
      if (this.searchValue) {
        url += "&searchValue=" + this.searchValue;
      }
      this.getRequest(url, null).then(resp => {
        if (resp) {
          this.showPageData(resp);
        }
      })
    },

    //表格点击详情
    openDetails(row,column){
      console.log("表格点击详情")
      console.log(row)
    },
    //新增操作
    addProduct() {
      this.isNeedId = false;
      this.dialogTableVisible = true;
      this.form = {};
    },

    //编辑查看操作
    editClick(row) {
      this.dialogTableVisible = true;
      //查询数据
      this.getRequest('/customerBasic/edit/' + row.personId).then(resp => {
        if (resp) {
          this.form = resp.data;
        }
      })
    },
    //删除操作
    deleteClick(row) {
      this.$confirm('此操作将永久删除【' + row.personName + '】, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/customerBasic/delete/" + row.personId).then(resp => {
          if (resp) {
            if (resp.isFlag) {
              //重新渲染数据
              this.refresh();
            }
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //改变分页的大小
    handleSizeChange(val) {
      this.pageSize = val;
      this.search(false);
    },
    //改变页码
    handleCurrentChange(val) {
      this.currentPage = val;
     this.search(false);
    },
    //提交插入/更新的商品信息
    onSubmit() {
      this.postRequest('/customerBasic/insertOrUpdate', this.form).then(resp => {
        if (resp) {
          if (resp.isFlag){
            this.dialogTableVisible=false;
            this.$message("客户信息更新成功");
            this.refresh();
          }
        }
      })
    },
    // 渲染分页请求数据
    showPageData(data) {
      this.tableData = data.data.dataList;
      this.total = data.data.total;
      console.log(data);
    },
    // 刷新列表
    refresh(){
      this.search(false);
    }
  },


  created() {
    // 获取列表数据
    this.refresh();
  },

  data() {
    return {
      //dom元素编号
      isNeedId: true,

      //tableData分页
      currentPage: 1,
      pageSize: 10,
      total: 0,

      //普通搜索
      searchValue: "",
      //高级搜索条件
      advanceSearch: {
        personName: "",
        address: ""
      },
      //高级搜索条件
      showAdvanceSearchView: false,

      //高级搜索，远程搜索
      restaurants: [],
      state: '',
      timeout: null,

      //对话框是否隐藏
      dialogTableVisible: false,
      // formLabelWidth: '300px',
      form: {
        personId: '',
        personName: '',
        address: ''
      },

      tableData: [],

    }
  }
}
</script>

<style scoped>
.basicInfo {
  margin-top: 15px;
}

.searchDiv {
  display: flex;
  width: 20%;
  padding: 10px 0;
}

</style>