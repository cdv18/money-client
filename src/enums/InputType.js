export const InputType = {
  TEXT: 'text',
  NUMBER: 'number',
  CURRENCY: 'currency',
  EMAIL: 'email',        // Thêm type email cho validate email
  PASSWORD: 'password',  // Thêm type password cho input mật khẩu
  DATE: 'date',         // Thêm type date cho nhập ngày
  TEL: 'tel'           // Thêm type tel cho số điện thoại
};

// Hàm format số thành dạng tiền tệ (thêm dấu chấm phân cách)
export const formatCurrency = (value) => {
  if (!value) return '';
  // Chuyển value về string và loại bỏ mọi ký tự không phải số
  const number = value.toString().replace(/[^\d]/g, '');
  // Thêm dấu chấm phân cách mỗi 3 chữ số
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Hàm chuyển từ định dạng tiền tệ về số
export const parseCurrency = (value) => {
  if (!value) return '';
  // Loại bỏ tất cả ký tự không phải số
  return value.toString().replace(/[^\d]/g, '');
};