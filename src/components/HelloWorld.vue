<template>
    <div class="index">
      <h1>欢迎使用后台管理系统</h1>
    	<div id="chart">
       <x-chart :id="id" :option="option"></x-chart>
      </div>
    </div>
</template>
<script>
	// if (!$.fn.highcharts) { 
 //    var script = document.createElement("script"); 
 //    script.type = "text/javascript"; 
 //    script.src = "${assetPath(src: 'js/plugins/layer/HighCharts/highcharts.js')}"; 
 //    document.body.appendChild(script); 
 //  }
	// 导入chart组件
import XChart from './Chart.vue'
// 导入chart组件模拟数据
import options from '@/chart-options/options'

export default {
  name: 'app',
  data() {
    let option = options.bar
    return {
      id: 'test',
      option: option
    }
  },
  components: {
    XChart
  }
}
 
</script>
<style>
.index{
  text-align: center;
}
h1{
  background: linear-gradient(to right, #5b9bfb, #e26dff);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 32px
}
#test {
  width:98%;
  height: 500px;
  margin: 40px auto;
}
#chart{
  /*position: fixed;*/
  /*top: 50px;*/
  width: 100%;
  height: 300px;
}
</style>