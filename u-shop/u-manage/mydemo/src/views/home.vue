<template>
  <div>
    <h1>
      欢迎光临首页！
      <div id="container"></div>
    </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    let myChart = this.$Echarts.init(document.getElementById("container"));
    //初始化配置项
    let options = {
      xAxis: {
        type: "category",
        data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "放假"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          //数据列
          data: [12, 44, 66, 199, 255, 16, 1],
          type: "line"
        }
      ]
    };
    //给图表设置配置项
    myChart.setOption(options);
  }
};
</script>

<style  lang="" scoped>
#container {
  width: 700px;
  height: 500px;
}
</style>
