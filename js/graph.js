  // Doughnut Chart
  const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
  const doughnutChart = new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
          labels: ['Users', 'Hotels', 'Bookings', 'Reviews'],
          datasets: [{
              label: 'Website Data',
              data: [300, 50, 100, 150],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
          }]
      }
  });

  // Up-Down Line Chart
  const upDownLineCtx = document.getElementById('upDownLineChart').getContext('2d');
  const upDownLineChart = new Chart(upDownLineCtx, {
      type: 'line',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
              label: 'Bookings',
              data: [10, 20, 15, 30, 25, 40, 35],
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              fill: false
          }, {
              label: 'Cancellations',
              data: [5, 15, 10, 25, 20, 30, 25],
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              fill: false
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });