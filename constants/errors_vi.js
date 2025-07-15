const ERROR_MESSAGES = {
  GENERAL: {
    "UNKNOWN_ERROR": "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.",
    "INVALID_REQUEST": "Định dạng yêu cầu không hợp lệ.",
    "MISSING_FIELDS": "Thiếu một hoặc nhiều trường bắt buộc.",
    "UNAUTHORIZED": "Bạn không có quyền thực hiện hành động này.",
    "FORBIDDEN": "Truy cập bị từ chối.",
    "NOT_FOUND": "Không tìm thấy tài nguyên.",
    "METHOD_NOT_ALLOWED": "Phương thức không được phép tại endpoint này.",
    "RATE_LIMITED": "Quá nhiều yêu cầu. Vui lòng giảm tốc độ."
  },
  AUTH: {
    "INVALID_TOKEN": "Token không hợp lệ hoặc đã hết hạn.",
    "LOGIN_FAILED": "Tên người dùng hoặc mật khẩu không đúng.",
    "ACCOUNT_SUSPENDED": "Tài khoản của bạn đã bị đình chỉ.",
    "EMAIL_NOT_VERIFIED": "Vui lòng xác minh email của bạn để tiếp tục.",
    "ACCESS_EXPIRED": "Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại."
  },
  VALIDATION: {
    "INVALID_EMAIL": "Vui lòng nhập địa chỉ email hợp lệ.",
    "INVALID_WALLET": "Vui lòng nhập địa chỉ ví hợp lệ.",
    "INVALID_PASSWORD": "Mật khẩu phải có ít nhất 8 ký tự.",
    "PASSWORD_MISMATCH": "Mật khẩu không khớp.",
    "INVALID_USERNAME": "Tên người dùng phải từ 3–20 ký tự, chỉ bao gồm chữ cái và số.",
    "INVALID_INPUT": "Một số trường đầu vào không hợp lệ.",
    "VALUE_TOO_LOW": "Giá trị thấp hơn mức tối thiểu cho phép.",
    "VALUE_TOO_HIGH": "Giá trị vượt quá mức tối đa cho phép.",
    "TITLE_TOO_SHORT": "Tiêu đề nhiệm vụ phải có ít nhất 5 ký tự.",
    "DESCRIPTION_TOO_SHORT": "Mô tả nhiệm vụ phải có ít nhất 10 ký tự.",
    "INVALID_NUMBER": "Giá trị số không hợp lệ hoặc bị thiếu.",
    "INVALID_LEVEL": "Cấp độ yêu cầu không hợp lệ."
  },
  TASK: {
    "INVALID_EMAIL": "Vui lòng nhập địa chỉ email hợp lệ.",
    "INVALID_WALLET": "Vui lòng nhập địa chỉ ví hợp lệ.",
    "INVALID_PASSWORD": "Mật khẩu phải có ít nhất 8 ký tự.",
    "PASSWORD_MISMATCH": "Mật khẩu không khớp.",
    "INVALID_USERNAME": "Tên người dùng phải từ 3–20 ký tự, chỉ bao gồm chữ cái và số.",
    "INVALID_INPUT": "Một số trường đầu vào không hợp lệ.",
    "VALUE_TOO_LOW": "Giá trị thấp hơn mức tối thiểu cho phép.",
    "VALUE_TOO_HIGH": "Giá trị vượt quá mức tối đa cho phép.",
    "TITLE_TOO_SHORT": "Tiêu đề nhiệm vụ phải có ít nhất 5 ký tự.",
    "DESCRIPTION_TOO_SHORT": "Mô tả nhiệm vụ phải có ít nhất 10 ký tự.",
    "INVALID_NUMBER": "Giá trị số không hợp lệ hoặc bị thiếu.",
    "INVALID_LEVEL": "Cấp độ yêu cầu không hợp lệ."
  },
  WALLET: {
    "INSUFFICIENT_FUNDS": "Bạn không có đủ Pi trong ví để tạo nhiệm vụ này.",
    "INVALID_WALLET_ADDRESS": "Địa chỉ ví Pi không hợp lệ.",
    "WALLET_NOT_CONNECTED": "Chưa kết nối ví.",
    "ESCROW_ERROR": "Không thể khóa Pi vào escrow."
  },
  DATABASE: {
    "CONNECTION_FAILED": "Kết nối cơ sở dữ liệu thất bại.",
    "DUPLICATE_ENTRY": "Bản ghi này đã tồn tại.",
    "SAVE_FAILED": "Lưu dữ liệu thất bại. Vui lòng thử lại.",
    "UPDATE_FAILED": "Cập nhật bản ghi thất bại."
  }
};
module.exports = ERROR_MESSAGES;
