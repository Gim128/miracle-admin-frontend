import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { getInstanceByDom, connect } from 'echarts';
import { EChartsOption } from 'echarts';

@Component({
    selector: 'app-analytical',
    moduleId: module.id,
    templateUrl: 'analytical.component.html',
    styleUrls: ['./analytical.component.scss']
})

export class AnalyticalComponent implements OnInit, AfterViewInit  {

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1430, 1550, 1200, 1650.1450, 1680.1890],
      type: 'line',
      areaStyle: {}
    }]
  }

  options = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Counters',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  };

  ngOnInit() {}


  ngAfterViewInit() {
    setTimeout(() => {
      const chartElement1 = document.getElementById('chart1');
      const chart1 = getInstanceByDom(chartElement1);
      connect([chart1]);
    });
  }
}
