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
          <el-row>
            <el-col :span="5">
              商品名称:
              <el-input v-model="advanceSearch.productName" placeholder="请输入内容" style="width: 150px"
                        size="small"></el-input>
            </el-col>
            <el-col :span="5">
              商品类别:
              <el-input v-model="advanceSearch.type" placeholder="请输入内容" style="width: 150px" size="small"></el-input>
            </el-col>
            <el-col :span="4" style="margin-top: 3px">
              库存:
              <el-radio size="small" v-model="advanceSearch.stock" label="1">升序</el-radio>
              <el-radio size="small" v-model="advanceSearch.stock" label="2">降序</el-radio>
            </el-col>
            <el-col :span="10">
              入库时间:
              <el-date-picker
                  v-model="advanceSearch.storageTimeRange"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                  style="width: 350px"
                  size="small"
                  value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
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
          prop="id"
          label="编号"
          width="100">
      </el-table-column>
      <el-table-column
          prop="productName"
          label="名称"
          width="300">
      </el-table-column>
      <el-table-column
          prop="type"
          label="类别"
          width="100">
      </el-table-column>
      <el-table-column
          prop="purchasePrice"
          label="进价"
          width="80">
      </el-table-column>
      <el-table-column
          prop="price"
          label="单价"
          width="80">
      </el-table-column>
      <el-table-column
          prop="stock"
          label="库存"
          width="120">
      </el-table-column>
      <el-table-column
          prop="sale"
          label="销量"
          width="120">
      </el-table-column>
      <el-table-column
          prop="shop"
          label="生产厂家"
          width="120">
      </el-table-column>
      <el-table-column
          prop="storageTime"
          label="入库时间"
          width="120">
      </el-table-column>
      <el-table-column
          prop="productAddress"
          label="生产地址"
          width="120">
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
    <el-dialog title="商品信息" :visible.sync="dialogTableVisible" width="80%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="商品名称">
              <el-input v-model="form.productName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-show="isNeedId">
            <el-form-item label="商品编号">
              <el-input v-model="form.id" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="商品类别">
              <el-input v-model="form.type"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="进价">
              <el-input v-model="form.purchasePrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单价">
              <el-input v-model="form.price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="库存">
              <el-input v-model="form.stock"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="销量">
              <el-input v-model="form.sale"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="生产地址">
              <el-input v-model="form.productAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产厂家">
              <el-input v-model="form.shop"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="入库时间">
          <el-col :span="11">
            <el-date-picker
                v-model="form.storageTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
            </el-date-picker>
          </el-col>
        </el-form-item>
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
  name: "proBasic",

  methods: {
    searchConditionReset(){
      this.searchValue= "";
      //高级搜索条件
      this.advanceSearch={
          productName: "",
          shop: "",
          productAddress: "",
          storageTimeRange: "",
          type: "",
          stock: "1"
      };
      this.refresh();
    },

    //搜索
    search(reset) {
      if (reset){
        this.currentPage=1;
      }

      let url = "/productBasic/?pageNum=" + this.currentPage + "&pageSize=" + this.pageSize;

      if (this.advanceSearch.type) {
        url += "&type=" + this.advanceSearch.type;
      }
      if (this.advanceSearch.productName) {
        url += "&productName=" + this.advanceSearch.productName;
      }
      if (this.searchValue) {
        url += "&searchValue=" + this.searchValue;
      }
      if (this.advanceSearch.stock) {
        url += "&stock=" + (this.advanceSearch.stock == 1 ? "asc" : "desc");
      }
      if (this.advanceSearch.storageTimeRange) {
        url += "&timeRange=" + this.advanceSearch.storageTimeRange;
      }
      this.getRequest(url, null).then(resp => {
        if (resp) {
          this.showPageData(resp);
        }
      })
    },

    //表格点击详情
    openDetails(row,column){
      // 跳转到/productDetail，并传递参数商品编号
      // this.$router.push({path: "/productDetail", query: {row: row}});
      // console.log("表格点击详情");
      // console.log(row)
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
      this.getRequest('/productBasic/edit/' + row.id).then(resp => {
        if (resp) {
          this.form = resp.data;
        }
      })
    },
    //删除操作
    deleteClick(row) {
      this.$confirm('此操作将永久删除【' + row.productName + '】, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/productBasic/delete/" + row.id).then(resp => {
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
      this.postRequest('/productBasic/insertOrUpdate', this.form).then(resp => {
        if (resp) {
            if (resp.isFlag){
              this.dialogTableVisible=false;
              this.$message("商品信息更新成功");
              this.refresh(true);
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
      this.advanceSearch.stock="";
      this.search(true);
    }
  },

  watch: {
    //销量排序开关改变，对列表重新排序
    "advanceSearch.stock": {
      handler(curVal) {
        this.search(true);
      }
    }
  },


  created() {
    // 获取列表数据
    this.refresh();
  },

  data() {
    return {
      //分页重置
      reset:true,

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
        productName: "",
        shop: "",
        productAddress: "",
        storageTimeRange: "",
        type: "",
        stock: "1"
      },
      //商品类别
      showAdvanceSearchView: false,

      //高级搜索，远程搜索
      restaurants: [],
      state: '',
      timeout: null,
      //销量排序
      radio: '1',

      //对话框是否隐藏
      dialogTableVisible: false,
      // formLabelWidth: '300px',
      form: {
        id: '',
        productName: '',
        storageTime: '',
        stock: '',
        type: '',
        shop: '',
        price: '',
        purchasePrice: '',
        productAddress: '',
        image: '',
        sale: ''
      },

      tableData: [],

      //时间选择
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
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