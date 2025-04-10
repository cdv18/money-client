<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-header">
        <h1>Đăng Ký</h1>
        <p>Tạo tài khoản Money App mới</p>
      </div>

      <form class="register-form" @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Họ và tên</label>
          <BaseInput 
            v-model="form.fullName"
            iconBefore="person"
            placeholder="Nhập họ và tên"
            :invalid="v$.fullName.$error"
          />
          <span v-if="v$.fullName.$error" class="error-text">
            {{ v$.fullName.$errors[0].$message }}
          </span>
        </div>

        <div class="form-group">
          <label>Email</label>
          <BaseInput 
            v-model="form.email"
            type="email"
            iconBefore="mail"
            placeholder="Nhập email"
            :invalid="v$.email.$error"
          />
          <span v-if="v$.email.$error" class="error-text">
            {{ v$.email.$errors[0].$message }}
          </span>
        </div>

        <div class="form-group">
          <label>Số điện thoại</label>
          <BaseInput 
            v-model="form.phone"
            type="tel"
            iconBefore="phone"
            placeholder="Nhập số điện thoại"
            :invalid="v$.phone.$error"
          />
          <span v-if="v$.phone.$error" class="error-text">
            {{ v$.phone.$errors[0].$message }}
          </span>
        </div>

        <div class="form-group">
          <label>Mật khẩu</label>
          <BaseInput 
            v-model="form.password"
            type="password"
            iconBefore="lock"
            placeholder="Nhập mật khẩu"
            :invalid="v$.password.$error"
          />
          <span v-if="v$.password.$error" class="error-text">
            {{ v$.password.$errors[0].$message }}
          </span>
        </div>

        <div class="form-group">
          <label>Xác nhận mật khẩu</label>
          <BaseInput 
            v-model="form.confirmPassword"
            type="password"
            iconBefore="lock"
            placeholder="Nhập lại mật khẩu"
            :invalid="v$.confirmPassword.$error"
          />
          <span v-if="v$.confirmPassword.$error" class="error-text">
            {{ v$.confirmPassword.$errors[0].$message }}
          </span>
        </div>

        <div class="form-actions">
          <BaseButton type="submit" variant="primary" class="register-button">
            Đăng ký
          </BaseButton>
        </div>

        <div class="form-footer">
          <p>Đã có tài khoản? 
            <router-link to="/login">Đăng nhập ngay</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import BaseInput from '../components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';

const router = useRouter();
const form = ref({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
});

const rules = {
  fullName: { required },
  email: { required, email },
  phone: { required },
  password: { required, minLength: minLength(6) },
  confirmPassword: { required, sameAs: sameAs(form.value.password) }
};

const v$ = useVuelidate(rules, form);

const handleRegister = async () => {
  const result = await v$.value.$validate();
  if (!result) return;

  // TODO: Implement register logic
  router.push('/login');
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-light);
  padding: 2rem 1rem;
}

.register-container {
  width: 100%;
  max-width: 440px;
  background: white;
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-md);
}

.register-header {
  text-align: center;
  margin-bottom: 2rem;
}

.register-header h1 {
  font-size: 2rem;
  color: #007AFF;
  margin-bottom: 0.5rem;
}

.register-header p {
  color: #666;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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

.error-text {
  color: #FF3B30;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.register-button {
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
</style>
