<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h1>Money App</h1>
        <p>Quản lý chi tiêu thông minh</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <BaseInput 
            v-model="form.email"
            type="email"
            placeholder="Nhập email của bạn"
            iconBefore="mail"
          />
        </div>

        <div class="form-group">
          <label>Mật khẩu</label>
          <BaseInput 
            v-model="form.password"
            type="password"
            placeholder="Nhập mật khẩu"
            iconBefore="lock"
          />
        </div>

        <div class="form-actions">
          <BaseButton type="submit" variant="primary" class="login-button">
            Đăng nhập
          </BaseButton>
        </div>

        <div class="form-footer">
          <p>Chưa có tài khoản? 
            <router-link to="/register">Đăng ký ngay</router-link>
          </p>
          <div class="intro-link">
            <router-link to="/intro" class="btn-intro">
              <span class="material-icons">arrow_back</span>
              Quay lại trang giới thiệu
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from '../components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';

const router = useRouter();
const form = ref({
  email: '',
  password: ''
});

const handleLogin = () => {
  // TODO: Implement login logic
  router.push('/');
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-light);
  padding: 1rem;
}

.login-container {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-md);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  font-size: 2rem;
  color: #007AFF;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #666;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  font-size: 0.875rem;
}

.form-actions {
  margin-top: 1rem;
}

.login-button {
  width: 100%;
  height: 44px;
  font-size: 1rem;
}

.form-footer {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #666;
}

.form-footer a {
  color: #007AFF;
  text-decoration: none;
  font-weight: 500;
}

.form-footer a:hover {
  text-decoration: underline;
}

.intro-link {
  margin-top: 1rem;
  text-align: center;
}

.btn-intro {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.btn-intro:hover {
  background: var(--bg-light);
  color: #007AFF;
}

.btn-intro .material-icons {
  font-size: 1.25rem;
}
</style>
