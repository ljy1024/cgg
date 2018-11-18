module.exports = {
  bar: {
    chart: {
        type: 'bar'
    },
    title: {
        text: '栏目点击阅读情况'
    },
    xAxis: {
        categories: ['体育', 'nitoo', '爱马仕', '热点', '体育图片精选']
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    legend: {
        /* 图例显示顺序反转
         * 这是因为堆叠的顺序默认是反转的，可以设置 
         * yAxis.reversedStacks = false 来达到类似的效果 
         */
        reversed: true 
    },
    exporting:{
        enabled:false
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
        name: '小学生',
        data: [5, 3, 4, 7, 2]
    }, {
        name: '中学生',
        data: [2, 2, 3, 2, 1]
    }, {
        name: '高中生',
        data: [3, 4, 4, 2, 5]
    }]
}
}