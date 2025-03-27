<template>
  <div>
    <h2>Thống Kê</h2>
    <p>Xem thống kê chi tiêu và thu nhập của bạn tại đây.</p>
    <div class="chart-wrapper">
      <BarChart 
        title="Thống kê doanh thu và chi phí" 
        :chartData="chartData"
        :chartOptions="chartOptions"
      />
    </div>
  </div>
</template>

<script>
import BarChart from '../components/BarChart.vue';

export default {
  components: {
    BarChart
  },
  data() {
    return {
      chartData: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
        datasets: [
          {
            label: 'Thu nhập',
            backgroundColor: '#4CAF50',
            data: [500, 700, 800, 600, 900, 1000]
          },
          {
            label: 'Chi tiêu',
            backgroundColor: '#F44336',
            data: [400, 500, 600, 300, 700, 800]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Thống kê thu nhập và chi tiêu (Dữ liệu giả lập)'
          }
        }
      }
    };
  }
};
</script>

<style scoped>
.chart-wrapper {
  margin-top: 20px;
  max-width: 800px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
</style>
