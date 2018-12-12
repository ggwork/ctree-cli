// 显示仪表盘图
var item1OptionChart1 = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {},

  series: [{
    name: '进度',
    type: 'gauge',
    max: 20,
    axisLine: {
      show: false,
      lineStyle: {
        color: [
          [0.6, '#6bcd6a'],
          [0.8, '#fdc710'],
          [1, '#f86375']
        ],
        width: 10
      }
    },
    splitLine: {
      length: 10
    },
    axisLabel: {
      distance: -25,
      show: false
    },
    pointer: {
      width: 2,
      length: '70%'
    },
    title: {
      fontSize: 12
    },
    detail: {
      formatter: '{value}%',
      fontSize: 12
    },
    data: [{
      value: 6,
      name: '完成率'
    }]
  }]
}

var item1OptionChart2 = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {},

  series: [{
    name: '进度',
    type: 'gauge',
    max: 1.6,
    axisLine: {
      show: false,
      lineStyle: {
        color: [
          [0.6, '#6bcd6a'],
          [0.8, '#fdc710'],
          [1, '#f86375']
        ],
        width: 10
      }
    },
    splitLine: {
      length: 10
    },
    axisLabel: {
      distance: -30,
      show: false
    },
    pointer: {
      width: 2,
      length: '70%'
    },
    title: {
      fontSize: 12
    },
    detail: {
      formatter: '{value}%',
      fontSize: 12
    },
    data: [{
      value: 0.26,
      name: '完成率'
    }]
  }]
}

var item1OptionChart3 = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {},

  series: [{
    name: '进度',
    type: 'gauge',
    max: 18,
    axisLine: {
      show: false,
      lineStyle: {
        color: [
          [0.6, '#6bcd6a'],
          [0.8, '#fdc710'],
          [1, '#f86375']
        ],
        width: 10
      }
    },
    splitLine: {
      length: 10
    },
    axisLabel: {
      distance: -30,
      show: false
    },
    pointer: {
      width: 2,
      length: '70%'
    },
    title: {
      fontSize: 12
    },
    detail: {
      formatter: '{value}%',
      fontSize: 12
    },
    data: [{
      value: 6,
      name: '完成率'
    }]
  }]
}

var item1char1 = echarts.init(document.getElementById('s-i-c1'))
item1char1.setOption(item1OptionChart1, true)

var item1char1 = echarts.init(document.getElementById('s-i-c2'))
item1char1.setOption(item1OptionChart2, true)

var item1char1 = echarts.init(document.getElementById('s-i-c3'))
item1char1.setOption(item1OptionChart3, true)

// 费用分析
var item2option = {
  color: ['#29a9f6', '#fe8165'],
  xAxis: {
    type: 'category',
    data: ['5月', '6月', '7月', '8月']
  },
  legend: {
    data: ['支付金额', '实际金额']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
      name: '支付金额',
      data: [420, 580, 360, 500],
      type: 'bar'
    },
    {
      name: '实际金额',
      data: [400, 600, 360, 580],
      type: 'bar'
    }
  ]
}

var item2chart = echarts.init(document.getElementById('s-item2-chart'))
item2chart.setOption(item2option, true)

// 进度图
function createChart() {
  var bgColor = [
    '#beedff',
    '#bdc7f8',
    '#e3c2fb',
    '#feb7d4',
    '#fdcdb7',
    '#fee1b5'
  ]
  var frontColor = ['#96dffa', '#6d6af7', '#be6afc', '#fd63a2', '#f99164', '#fec96f'];
  var dataAxis = ['项目前期准备', '施工图设计', '施工监理招标', '施工进场准备', '项目进场施工', '项目验收']
  var data = [90, 65, 55, 55, 35, 10]
  var wrapWidth = parseInt($('.p-c-li-wrap').css('width'))
  for (var i = 0; i < bgColor.length; i++) {
    $('.p-c-li-wrap').eq(i).css('background-color', bgColor[i])
    $('.p-c-li-color').eq(i).css({
      'background-color': frontColor[i],
      'width': (data[i] / 100 * wrapWidth) + 'px'
    })

  }
}
createChart()