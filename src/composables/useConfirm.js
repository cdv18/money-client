import { createApp, h } from 'vue';
import GlobalConfirm from '../components/GlobalConfirm.vue';

let confirmInstance = null;

export const useConfirm = () => {
  const createConfirmInstance = () => {
    if (confirmInstance) return;

    const mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);

    const app = createApp({
      render() {
        return h(GlobalConfirm, {
          ref: 'confirmRef'
        });
      }
    });

    confirmInstance = app.mount(mountPoint).$refs.confirmRef;
  };

  const confirm = async (title, message) => {
    if (!confirmInstance) {
      createConfirmInstance();
    }
    return await confirmInstance.show(title, message);
  };

  return {
    confirm
  };
};
