import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './index.css';
import './styles/components/BaseInput.css'; // Thêm dòng này

// Import Chart.js và vue-chartjs
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

import axios from './plugins/axios';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VCalendar, {});

// Thêm axios vào Vue global properties
app.config.globalProperties.$axios = axios;

app.mount('#app');
