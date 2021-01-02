<template>
  <div style="margin: -6px">
    <el-header class="homeHeader" >
      <div class="title">{{ this.$route.query.row.productName }}</div>
    </el-header>

    <div class="basicInformation">
      <el-row :gutter="20">
        <el-col :span="16">
          <div><b>商品名称：</b><span>{{ this.form.productName }}</span></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <div><b>商品类别：</b><span>{{ this.form.type }}</span></div>
        </el-col>
        <el-col :span="10">
          <div><b>生产厂家：</b><span>{{ this.form.shop }}</span></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <div><b>进价：</b><span>{{ this.form.purchasePrice }}元</span></div>
        </el-col>
        <el-col :span="10">
          <div><b>单价：</b><span>{{ this.form.price }}元</span></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <div><b>库存：</b><span>{{ this.form.stock }}</span></div>
        </el-col>
        <el-col :span="10">
          <div><b>销量：</b><span>{{ this.form.sale }}</span></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <div><b>入库时间：</b><span>{{ this.form.storageTime }}</span></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "productDetail",
  data() {
    return {
      isNeedId: "",
      productId: "",

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
    }
  },

  mounted() {
    // 从路由信息获取商品ID
    this.productId = this.$route.query.row.id;

    //查询数据
    this.getRequest('/productBasic/edit/' + this.productId).then(resp => {
      if (resp) {
        this.form = resp.data;
      }
    })
  }
}
</script>

<style scoped>
.basicInformation {
  background-color: #EBEEF5;
  border-bottom: 1px solid lightcyan;
  margin-top: 10px;
  height: 200px;
  width: 1000px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.homeHeader {
  background-color: #f5f1f1;
  border-bottom: 1px solid #409eff;
  /*设置元素垂直居中*/
  display: flex;
  /*设置元素垂直居中*/
  align-items: center;
  /*在弹性盒对象的 <div> 元素中的各项周围留有空白*/
  justify-content: space-between;
  padding: 10px;
}

.homeHeader .title {
  font-size: 14px;
  font-family: 华文行楷;
  color: #409eff;
}

.el-row {
  margin-bottom: 20px;
&
:last-child {
  margin-bottom: 0;
}

}
.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}


.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.basicInformation .span{
  border-bottom: 1px solid;
}
</style>