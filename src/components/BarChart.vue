<template>
  <div class="chart-container">
    <h3>{{ title }}</h3>
    <div class="chart-wrapper">
      <Bar
        :data="chartData"
        :options="defaultOptions"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    title: {
      type: String,
      default: 'Biểu đồ thanh'
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  computed: {
    defaultOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
  }
});
</script>

<style scoped>
.chart-container {
  padding: 20px;
  background: var(--surface-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.chart-wrapper {
  position: relative;
  height: 300px;
  box-sizing: border-box;
  margin: 0 auto;
}
</style>
