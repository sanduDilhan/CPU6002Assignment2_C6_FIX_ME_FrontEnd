module.exports = {
  series: [0, 0, 0],
  options: {
    chart: {
      // width: 380,
      // type: 'pie',
    },
    labels: ['Buyer Request Count', 'Traveller Request Count', 'Shipment Request Count'],
    colors: ['#e97200', '#db00f5', '#1a69e3'],
    responsive: [{
      // breakpoint: 480,
      options: {
        // chart: {
        //   width: 200
        // },
        legend: {
          position: 'bottom'
        }
      }
    }]
  },
}
