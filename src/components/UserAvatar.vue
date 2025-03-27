<template>
  <div
    :style="{
      width: size + 'px',
      height: size + 'px',
      backgroundImage: `url('${url}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '50%',
      border: showBorder ? '1px solid black' : 'none'
    }"
    class="user-avatar"
  ></div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 32 // Kích thước mặc định là 32px
    },
    url: {
      type: String,
      default: 'https://via.placeholder.com/32' // Avatar giả mặc định
    },
    showBorder: {
      type: Boolean,
      default: true // Mặc định hiển thị đường viền
    }
  }
};
</script>

<style scoped>
.user-avatar {
  display: inline-block;
}
</style>
