const ERROR_MESSAGES = {
  GENERAL: {
  "UNKNOWN_ERROR": "发生了意外错误，请稍后再试。",
  "INVALID_REQUEST": "请求格式无效。",
  "MISSING_FIELDS": "缺少一个或多个必填字段。",
  "UNAUTHORIZED": "您无权执行此操作。",
  "FORBIDDEN": "访问被拒绝。",
  "NOT_FOUND": "资源未找到。",
  "METHOD_NOT_ALLOWED": "该接口不允许使用该请求方式。",
  "RATE_LIMITED": "请求过多，请稍后再试。"
  },
  AUTH: {
    "INVALID_TOKEN": "令牌无效或已过期。",
    "LOGIN_FAILED": "用户名或密码错误。",
    "ACCOUNT_SUSPENDED": "您的账户已被暂停。",
    "EMAIL_NOT_VERIFIED": "请验证您的邮箱以继续。",
    "ACCESS_EXPIRED": "您的登录已过期，请重新登录。"
  },
  VALIDATION: {
    "INVALID_EMAIL": "请输入有效的电子邮件地址。",
    "INVALID_WALLET": "请输入有效的钱包地址。",
    "INVALID_PASSWORD": "密码至少需要8个字符。",
    "PASSWORD_MISMATCH": "两次输入的密码不一致。",
    "INVALID_USERNAME": "用户名需为3到20个字符，仅限字母和数字。",
    "INVALID_INPUT": "某些输入字段无效。",
    "VALUE_TOO_LOW": "数值低于允许的最小值。",
    "VALUE_TOO_HIGH": "数值超出允许的最大值。",
    "TITLE_TOO_SHORT": "任务标题至少需要5个字符。",
    "DESCRIPTION_TOO_SHORT": "任务描述至少需要10个字符。",
    "INVALID_NUMBER": "数值无效或缺失。",
    "INVALID_LEVEL": "指定的等级无效。"
  },
  TASK: {
    "MAX_REWARD": "此等级的最大奖励为：",
    "INVALID_REWARD": "奖励必须是正数。",
    "INVALID_USER_LEVEL": "所选用户等级无效。",
    "MAX_USERS_REQUIRED": "您必须指定可完成任务的用户数量。",
    "TASK_NOT_FOUND": "请求的任务不存在。",
    "TASK_ALREADY_COMPLETED": "此任务已完成。",
    "PROOF_REQUIRED": "此类型的任务需要提交证明。",
    "URL_REQUIRED": "此类型的任务需要提供链接。",
    "URL_INVALID": "链接无效。",
    "CANNOT_TARGET_HIGHER_LEVEL": "您不能将任务指派给比您等级高的用户。",
    "TASK_TOO_EXPENSIVE": "任务总成本超出允许的上限。",
    "USER_LEVEL_TOO_LOW": "您的等级不符合此任务的要求。",
    "USER_KD_TOO_LOW": "您的KD不符合此任务的要求。",
    "TASK_ALREADY_CLAIMED": "您已有一个等待完成的任务。",
    "TASK_ALREADY_CLAIMED_CANNOT_CLAIM_IT_AGAIN": "您已领取此任务，不能再次领取。"
  },
  WALLET: {
    "INSUFFICIENT_FUNDS": "您的钱包中Pi数量不足，无法创建此任务。",
    "INVALID_WALLET_ADDRESS": "钱包地址无效。",
    "WALLET_NOT_CONNECTED": "未连接钱包。",
    "ESCROW_ERROR": "锁定Pi到托管账户失败。"
  },
  DATABASE: {
    "CONNECTION_FAILED": "连接数据库失败。",
    "DUPLICATE_ENTRY": "该记录已存在。",
    "SAVE_FAILED": "保存数据失败，请重试。",
    "UPDATE_FAILED": "更新记录失败。"
  }
};
module.exports = ERROR_MESSAGES;
