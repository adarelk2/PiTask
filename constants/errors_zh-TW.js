const ERROR_MESSAGES = {
  GENERAL: {
    "UNKNOWN_ERROR": "發生未知錯誤，請稍後再試。",
    "INVALID_REQUEST": "請求格式無效。",
    "MISSING_FIELDS": "缺少一個或多個必要欄位。",
    "UNAUTHORIZED": "您沒有執行此操作的權限。",
    "FORBIDDEN": "拒絕存取。",
    "NOT_FOUND": "找不到資源。",
    "METHOD_NOT_ALLOWED": "此端點不允許使用該方法。",
    "RATE_LIMITED": "請求過於頻繁，請稍後再試。"
  },
  AUTH: {
    "INVALID_TOKEN": "Token 無效或已過期。",
    "LOGIN_FAILED": "使用者名稱或密碼錯誤。",
    "ACCOUNT_SUSPENDED": "您的帳號已被停用。",
    "EMAIL_NOT_VERIFIED": "請驗證您的電子郵件以繼續操作。",
    "ACCESS_EXPIRED": "您的登入會話已過期，請重新登入。"
  },
  VALIDATION: {
    "INVALID_EMAIL": "請輸入有效的電子郵件地址。",
    "INVALID_WALLET": "請輸入有效的錢包地址。",
    "INVALID_PASSWORD": "密碼至少需要 8 個字元。",
    "PASSWORD_MISMATCH": "兩次輸入的密碼不一致。",
    "INVALID_USERNAME": "使用者名稱必須為 3 至 20 個字元，只能包含字母與數字。",
    "INVALID_INPUT": "有些輸入欄位無效。",
    "VALUE_TOO_LOW": "值低於允許的最小值。",
    "VALUE_TOO_HIGH": "值超過允許的最大值。",
    "TITLE_TOO_SHORT": "任務標題至少需 5 個字元。",
    "DESCRIPTION_TOO_SHORT": "任務描述至少需 10 個字元。",
    "INVALID_NUMBER": "數值無效或缺失。",
    "INVALID_LEVEL": "所需的等級無效。"
  },
  TASK: {
    "MAX_REWARD": "此等級的最大獎勵為：",
    "INVALID_REWARD": "獎勵必須是正數。",
    "INVALID_USER_LEVEL": "所選的使用者等級無效。",
    "MAX_USERS_REQUIRED": "您必須指定可完成任務的人數。",
    "TASK_NOT_FOUND": "找不到該任務。",
    "TASK_ALREADY_COMPLETED": "此任務已完成。",
    "PROOF_REQUIRED": "此任務類型需要提交證明。",
    "URL_REQUIRED": "此任務類型需要提供連結。",
    "URL_INVALID": "連結無效。",
    "CANNOT_TARGET_HIGHER_LEVEL": "您不能指派任務給等級高於您的使用者。",
    "TASK_TOO_EXPENSIVE": "任務總成本超出允許的上限。",
    "USER_LEVEL_TOO_LOW": "您的等級不足以執行此任務。",
    "USER_KD_TOO_LOW": "您的 KD 未達成此任務的要求。",
    "TASK_ALREADY_CLAIMED": "您已有一個待完成的任務。",
    "TASK_ALREADY_CLAIMED_CANNOT_CLAIM_IT_AGAIN": "您已領取此任務，無法再次領取。"
  },
  WALLET: {
    "INSUFFICIENT_FUNDS": "您的錢包 Pi 餘額不足，無法建立此任務。",
    "INVALID_WALLET_ADDRESS": "錢包地址無效。",
    "WALLET_NOT_CONNECTED": "未連接任何錢包。",
    "ESCROW_ERROR": "無法將 Pi 鎖定至託管帳戶中。"
  },
  DATABASE: {
    "CONNECTION_FAILED": "連接資料庫失敗。",
    "DUPLICATE_ENTRY": "該紀錄已存在。",
    "SAVE_FAILED": "儲存資料失敗，請稍後再試。",
    "UPDATE_FAILED": "更新紀錄失敗。"
  }
};
module.exports = ERROR_MESSAGES;
