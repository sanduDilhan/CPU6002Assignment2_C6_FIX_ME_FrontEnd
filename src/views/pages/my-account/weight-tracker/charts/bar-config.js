module.exports = {
  series: [{
    name: "Value (%)",
    data: []
  }],
  options: {
    states: {
      hover: {
        filter: {
          type: 'none',
        }
      },
    },
    chart: {
      height: 350,
      type: 'bar',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      tooltips:{
        enabled:false
      }
    },
    tooltip: {

    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `${val}%` ;
      },
    },
    stroke: {
      // curve: 'straight'
    },
    // colors: ['#00c50b', "#e8e8e8", "#4d3a96","#4576b5","#4576b5","#ffffff","#4576b5"],
    title: {
      // text: 'Product Trends by Month',
      align: 'left'
    },
    colors: [
      function ({ value, seriesIndex, dataPointIndex, w }) {
        if (value >= 85 && value <= 100) {
          // return "#00c50b";
          // return "#35b200";
          return "#35b200";
        } else if (value >= 75 && value < 85) {
          // return "#ffff22";
          // return "#ffdc1f";
          return "#c7aa03";
        }else{
          // return "#ff4b4b";
          // return "#ff5151";
          return "#e12020";
        }
      }
    ],
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      min: 0,
      max: 100,
    },
    plotOptions: {
      bar: {
        columnWidth: 42.45 + "%",
        horizontal: true
      },
    }
  }
}
