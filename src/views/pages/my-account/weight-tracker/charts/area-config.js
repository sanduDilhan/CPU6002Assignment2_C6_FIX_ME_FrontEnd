module.exports = {
  series: [{name: "Weight", data: []}, {name: "Target", data: []}],
  options: {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    // stroke: {
    //   // curve: 'straight'
    // },
    stroke: {
      width: [2, 2],
      // curve: 'straight',
      // curve: 'stepline',
      dashArray: [0, 10]
    },
    colors: ['#4313bb', "#01943c"],
    title: {
      // text: 'Weight (kg)',
      // align: 'left'
    },
    grid: {
      // row: {
      //   colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      //   opacity: 0.5
      // },
      // borderColor: '#f1f1f1',
      // show: true,
      // borderColor: '#90A4AE',
      // strokeDashArray: 0,
      // position: 'back',
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      // row: {
      //   colors: undefined,
      //   opacity: 0.5
      // },
      // column: {
      //   colors: undefined,
      //   opacity: 0.5
      // },
      // padding: {
      //   top: 0,
      //   right: 0,
      //   bottom: 0,
      //   left: 0
      // },
    },
    xaxis: {
      categories: [],
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + ":"
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val + ":"
            }
          }
        }
      ]
    },
    markers: {
      // size: 0,
      size: [6, 0]
      // hover: {
      //   sizeOffset: 6
      // }
    },
    fill: {
      type: 'solid',
      colors: ['transparent'],
    },
    yaxis: {
      opposite: false,
      labels: {
        maxWidth: "auto",
        style: {
          colors: ["#BEBFCB"],
          // fontSize: "40px"
        }
      },
      title: {
        text: 'Weight (kg)',
        // offsetX:  10,
        floating: true,
      },
    },
    legend: {
      show: true,
      position: 'top',
    },

  }

  // options: {
  //   chart: {
  //     id: 'stat-area-chart',
  //     toolbar: {
  //       show: false
  //     },
  //     animations: {
  //       enabled: false
  //     },
  //     height: '1400px'
  //   },
  //   xaxis: {
  //     categories: ["EDF", "UNP", "TMA", "NDF"]
  //   },
  //   plotOptions: {
  //     bar: {
  //       columnWidth: 42.45 + "%"
  //     },
  //   },
  //   // colors:['#F44336', '#E91E63', '#9C27B0','#E91E63']
  // },
  // series: [{
  //   name: 'Vote',
  //   data: [{
  //     x: 'Category A',
  //     y: 6653,
  //     fillColor: '#4F81BC',
  //     strokeColor: '#4F81BC'
  //   }, {
  //     x: 'Category A',
  //     y: 3267,
  //     fillColor: '#C0504E',
  //     strokeColor: '#C0504E'
  //   }, {
  //     x: 'Category A',
  //     y: 1045,
  //     fillColor: '#9BBB58',
  //     strokeColor: '#9BBB58'
  //   }, {
  //     x: 'Category A',
  //     y: 5089,
  //     fillColor: '#37B7A8',
  //     strokeColor: '#37B7A8'
  //   }]
  // }]
}
