const ERROR_MESSAGES = {
  GENERAL: {
      "UNKNOWN_ERROR": "אירעה שגיאה בלתי צפויה. אנא נסה שוב מאוחר יותר.",
      "INVALID_REQUEST": "פורמט הבקשה אינו חוקי.",
      "MISSING_FIELDS": "חסרים שדות נדרשים.",
      "UNAUTHORIZED": "אין לך הרשאה לבצע פעולה זו.",
      "FORBIDDEN": "הגישה נדחתה.",
      "NOT_FOUND": "המשאב לא נמצא.",
      "METHOD_NOT_ALLOWED": "השיטה הזו אינה נתמכת עבור כתובת זו.",
      "RATE_LIMITED": "יותר מדי בקשות. אנא האט את הקצב."
  },

  AUTH: {
    "INVALID_TOKEN": "האסימון שגוי או שפג תוקפו.",
    "LOGIN_FAILED": "שם המשתמש או הסיסמה שגויים.",
    "ACCOUNT_SUSPENDED": "החשבון שלך הושעה.",
    "EMAIL_NOT_VERIFIED": "אנא אמת את כתובת האימייל שלך כדי להמשיך.",
    "ACCESS_EXPIRED": "ההתחברות שלך פגה. אנא התחבר שוב."
  },

  VALIDATION: {
    "INVALID_EMAIL": "אנא הזן כתובת אימייל תקינה.",
    "INVALID_WALLET": "אנא הזן כתובת ארנק תקינה.",
    "INVALID_PASSWORD": "הסיסמה חייבת להכיל לפחות 8 תווים.",
    "PASSWORD_MISMATCH": "הסיסמאות אינן תואמות.",
    "INVALID_USERNAME": "שם המשתמש חייב להיות בין 3 ל־20 תווים, באותיות ומספרים בלבד.",
    "INVALID_INPUT": "חלק מהשדות שהוזנו אינם תקינים.",
    "VALUE_TOO_LOW": "הערך נמוך מהמינימום המותר.",
    "VALUE_TOO_HIGH": "הערך חורג מהמקסימום המותר.",
    "TITLE_TOO_SHORT": "כותרת המשימה חייבת להכיל לפחות 5 תווים.",
    "DESCRIPTION_TOO_SHORT": "תיאור המשימה חייב להכיל לפחות 10 תווים.",
    "INVALID_NUMBER": "ערך מספרי חסר או לא תקין.",
    "INVALID_LEVEL": "רמת המשתמש שצוינה אינה תקפה."
  },

  TASK: {
    "MAX_REWARD": "המקסימום לתגמול ברמה זו הוא: ",
    "INVALID_REWARD": "התגמול חייב להיות מספר חיובי.",
    "INVALID_USER_LEVEL": "נבחרה רמת משתמש לא תקינה.",
    "MAX_USERS_REQUIRED": "עליך לציין כמה משתמשים יכולים להשלים את המשימה.",
    "TASK_NOT_FOUND": "המשימה המבוקשת לא קיימת.",
    "TASK_ALREADY_COMPLETED": "משימה זו כבר הושלמה.",
    "PROOF_REQUIRED": "נדרש להגיש הוכחה עבור סוג משימה זה.",
    "URL_REQUIRED": "נדרש להזין כתובת URL עבור סוג משימה זה.",
    "URL_INVALID": "כתובת ה-URL אינה תקינה.",
    "CANNOT_TARGET_HIGHER_LEVEL": "אינך יכול להקצות משימות למשתמשים ברמה גבוהה משלך.",
    "TASK_TOO_EXPENSIVE": "עלות המשימה חורגת מהמקסימום המותר.",
    "USER_LEVEL_TOO_LOW": "רמת המשתמש שלך אינה עומדת בדרישות המשימה.",
    "USER_KD_TOO_LOW": "ה-KD שלך אינו עומד בדרישות המשימה.",
    "TASK_ALREADY_CLAIMED": "כבר יש לך משימה פעילה שממתינה להשלמה.",
    "TASK_ALREADY_CLAIMED_CANNOT_CLAIM_IT_AGAIN": "כבר לקחת משימה זו ואינך יכול לקחת אותה שוב."
  },
  WALLET: {
    "INSUFFICIENT_FUNDS": "אין לך מספיק מטבעות Pi כדי ליצור משימה זו.",
    "INVALID_WALLET_ADDRESS": "כתובת הארנק שגויה.",
    "WALLET_NOT_CONNECTED": "לא חובר ארנק.",
    "ESCROW_ERROR": "נכשל הניסיון לנעול את הסכום ב-escrow."
  },

  DATABASE: {
    "CONNECTION_FAILED": "החיבור למסד הנתונים נכשל.",
    "DUPLICATE_ENTRY": "רשומה זו כבר קיימת.",
    "SAVE_FAILED": "שמירת הנתונים נכשלה. אנא נסה שוב.",
    "UPDATE_FAILED": "עדכון הרשומה נכשל."
  }
};

module.exports = ERROR_MESSAGES;
