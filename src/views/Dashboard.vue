<template>
  <div class="dashboard">
    <p>Chào mừng bạn đến với ứng dụng quản lý chi tiêu cá nhân!</p>
    
    <!-- Thêm các thẻ thống kê -->
    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-header">Số dư hiện tại</div>
        <div class="stat-amount">2,500,000 ₫</div>
        <div class="stat-footer">Cập nhật lần cuối: Hôm nay</div>
      </div>
      <div class="stat-card">
        <div class="stat-header">Tổng thu tháng này</div>
        <div class="stat-amount positive">+4,200,000 ₫</div>
        <div class="stat-footer">So với tháng trước: +15%</div>
      </div>
      <div class="stat-card">
        <div class="stat-header">Tổng chi tháng này</div>
        <div class="stat-amount negative">-1,700,000 ₫</div>
        <div class="stat-footer">So với tháng trước: -5%</div>
      </div>
    </div>

    <div class="chart-section">
      <BarChart
        title="Thống kê thu nhập và chi tiêu"
        :chartData="chartConfig"
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
  computed: {
    chartConfig() {
      return {
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
      }
    }
  }
};
</script>

<style scoped>
.dashboard {
  max-width: 100%;
}

.chart-wrapper {
  margin: 20px 0;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--surface-light);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.stat-header {
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.stat-amount {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.stat-footer {
  color: #666;
  font-size: 0.75rem;
}

.positive {
  color: #4CAF50;
}

.negative {
  color: #F44336;
}

</style>
