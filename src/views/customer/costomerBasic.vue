<template>
  <div class="basicInfo">
    <div>
        <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input2"
            style="width: 350px;margin:10px 0"
        >
        </el-input>
      <el-button round style="margin-left: 10px">搜索</el-button>
      <el-button round @click="showAdvanceSearchView = !showAdvanceSearchView">
        <i :class="showAdvanceSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'"
           aria-hidden="true"></i>
        高级搜索
      </el-button>
      <transition name="slide-fade">
        <div v-show="showAdvanceSearchView"
             style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding: 5px;margin: 10px 0px;">
          <el-row>
            <el-col :span="5">
              政治面貌:
            </el-col>
            <el-col :span="4">
              民族:

            </el-col>
            <el-col :span="4">
              职位:

            </el-col>
            <el-col :span="4">
              职称:

            </el-col>
            <el-col :span="7">
              聘用形式:
              </el-col>

          </el-row>
        </div>
      </transition>
    </div>
<!--    <div>-->
<!--      <el-input placeholder="请输入员工名进行搜索，可以直接回车搜索..." prefix-icon="el-icon-search"-->
<!--                clearable-->
<!--                @clear="initEmps"-->
<!--                style="width: 350px;margin-right: 10px" v-model="keyword"-->
<!--                @keydown.enter.native="initEmps" :disabled="showAdvanceSearchView"></el-input>-->
<!--      <el-button icon="el-icon-search" type="primary" @click="initEmps" :disabled="showAdvanceSearchView">-->
<!--        搜索-->
<!--      </el-button>-->
<!--      <el-button type="primary" @click="showAdvanceSearchView = !showAdvanceSearchView">-->
<!--        <i :class="showAdvanceSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'"-->
<!--           aria-hidden="true"></i>-->
<!--        高级搜索-->
<!--      </el-button>-->
<!--    </div>-->
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="date"
          label="编号"
          width="150">
      </el-table-column>
      <el-table-column
          prop="name"
          label="名称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="province"
          label="类别"
          width="120">
      </el-table-column>
      <el-table-column
          prop="city"
          label="进价"
          width="120">
      </el-table-column>
      <el-table-column
          prop="address"
          label="单价"
          width="300">
      </el-table-column>
      <el-table-column
          prop="zip"
          label="库存"
          width="120">
      </el-table-column>
      <el-table-column
          prop="zip"
          label="销量"
          width="120">
      </el-table-column>
      <el-table-column
          prop="zip"
          label="生产地址"
          width="120">
      </el-table-column>
      <el-table-column
          prop="zip"
          label="生产厂家"
          width="120">
      </el-table-column>
      <el-table-column
          prop="zip"
          label="入库时间"
          width="120">
      </el-table-column>
      <el-table-column
          prop="zip"
          label="备注"
          width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="dialogTableVisible = true" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
      </el-pagination>
    </div>
    <el-dialog title="商品信息" :visible.sync="dialogTableVisible" width="80%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="商品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品编号">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="商品类别">
              <el-select v-model="form.region" placeholder="请选择类别">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="进价">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单价">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="库存">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="销量">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="生产地址">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产厂家">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="入库时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">完成</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "customerBasic",

  methods: {
    handleClick(row) {
      console.log(row);
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    onSubmit(){
      console.log("onSubmit");
    }
  },

  data() {
    return {
      showAdvanceSearchView: false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,

      //对话框是否隐藏
      dialogTableVisible: false,
      // formLabelWidth: '300px',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },

      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }
        , {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }
      ]
    }
  }
}
</script>

<style scoped>
.basicInfo {
  margin-top: 15px;
}
.searchDiv{
  display: flex;
  width: 20%;
  padding: 10px 0;
}

</style>