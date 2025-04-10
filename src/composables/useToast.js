import { ref } from 'vue';

const toasts = ref([]);

export function useToast() {
  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    toasts.value.push({ id, message, type });
    
    // Tự động xóa toast sau duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  // Helper functions cho các loại toast khác nhau
  const success = (message, duration) => addToast(message, 'success', duration);
  const error = (message, duration) => addToast(message, 'error', duration);
  const warning = (message, duration) => addToast(message, 'warning', duration);
  const info = (message, duration) => addToast(message, 'info', duration);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  };
}