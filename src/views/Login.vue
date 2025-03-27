<template>
  <div>
    <h2>Đăng Nhập</h2>
    <form>
      <div>
        <label for="email">Email:</label>
        <BaseInput type="email" id="email" iconBefore="mail" />
      </div>
      <div>
        <label for="password">Mật khẩu:</label>
        <BaseInput type="password" id="password" iconBefore="lock" />
      </div>
      <BaseButton variant="primary" iconAfter="login">Đăng Nhập</BaseButton>
    </form>
  </div>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';

export default {
  components: {
    BaseButton,
    BaseInput
  }
};
</script>
