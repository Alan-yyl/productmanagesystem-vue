<template>
  <div id="sale-record" style="width: 1000px;height: 500px">
  </div>
</template>

<script>
export default {
  name: "realTimeData",
  data() {
    return {
      //日期
      date:[],
      //销售额
      sum:[],
      //销量
      count:[],
    }
  },

  mounted() {
    // 初始化数据
    this.getRequest('saleRecord/saleRecordRealTimeData',null).then(resp=>{
      for (let i = 0; i < resp.data.length; i++) {
        let item=resp.data[i];
          this.date[i]=item.date;
          this.sum[i]=item.sum;
          this.count[i]=item.count;
      }
      this.drawLine();
    })


  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('sale-record'))
      // 绘制图表
      myChart.setOption(
          {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['销量', '销售额']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
            },
            yAxis: {
              type: 'category',
              data: this.date
            },
            series: [
              {
                name: '销量',
                type: 'bar',
                data: this.count
              },
              {
                name: '销售额',
                type: 'bar',
                data: this.sum
              }
            ]
          }
      );
    }
  }
}
</script>


<style scoped>

</style>