<template>
  <div>
    <h2>Đăng Ký</h2>
    <form>
      <div>
        <label for="name">Họ và Tên:</label>
        <BaseInput type="text" id="name" iconBefore="person" />
      </div>
      <div>
        <label for="email">Email:</label>
        <BaseInput type="email" id="email" iconBefore="mail" />
      </div>
      <div>
        <label for="password">Mật khẩu:</label>
        <BaseInput type="password" id="password" iconBefore="lock" />
      </div>
      <BaseButton variant="primary" iconAfter="how_to_reg">Đăng Ký</BaseButton>
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
