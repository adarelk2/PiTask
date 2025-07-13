const ERROR_MESSAGES = {
    GENERAL: {
      UNKNOWN_ERROR: "An unexpected error occurred. Please try again later.",
      INVALID_REQUEST: "Invalid request format.",
      MISSING_FIELDS: "One or more required fields are missing.",
      UNAUTHORIZED: "You are not authorized to perform this action.",
      FORBIDDEN: "Access denied.",
      NOT_FOUND: "Resource not found.",
      METHOD_NOT_ALLOWED: "Method not allowed on this endpoint.",
      RATE_LIMITED: "Too many requests. Please slow down.",
    },
  
    AUTH: {
      INVALID_TOKEN: "Invalid or expired token.",
      LOGIN_FAILED: "Incorrect username or password.",
      ACCOUNT_SUSPENDED: "Your account has been suspended.",
      EMAIL_NOT_VERIFIED: "Please verify your email to continue.",
      ACCESS_EXPIRED: "Your session has expired. Please log in again.",
    },
  
    VALIDATION: {
      INVALID_EMAIL: "Please enter a valid email address.",
      INVALID_PASSWORD: "Password must be at least 8 characters long.",
      PASSWORD_MISMATCH: "Passwords do not match.",
      INVALID_USERNAME: "Username must be 3–20 characters, letters and numbers only.",
      INVALID_INPUT: "Some input fields are invalid.",
      VALUE_TOO_LOW: "Value is below the allowed minimum.",
      VALUE_TOO_HIGH: "Value exceeds the allowed maximum.",
      TITLE_TOO_SHORT: "Task title must be at least 5 characters long.",
      DESCRIPTION_TOO_SHORT: "Task description must be at least 10 characters long.",
      INVALID_NUMBER: "A numeric value is invalid or missing.",
      INVALID_LEVEL: "Required level is not valid.",
    },
  
    TASK: {
      INVALID_REWARD: "Reward must be a positive number.",
      INVALID_USER_LEVEL: "Invalid user level selected.",
      MAX_USERS_REQUIRED: "You must specify how many users can complete the task.",
      TASK_NOT_FOUND: "The requested task does not exist.",
      TASK_ALREADY_COMPLETED: "This task has already been completed.",
      PROOF_REQUIRED: "Proof is required for this task type.",
      URL_REQUIRED: "URL is required for this task type.",
      URL_INVALID: "URL is Invalid.",
      CANNOT_TARGET_HIGHER_LEVEL: "You cannot assign tasks to users at a higher level than yourself.",
      TASK_TOO_EXPENSIVE: "Total task cost exceeds allowed maximum.",
      USER_LEVEL_TOO_LOW: "Your user level does not meet the requirement for this task.",
      USER_KD_TOO_LOW: "Your user KD does not meet the requirement for this task.",
      TASK_ALREADY_CLAIMED: "You already have an active task waiting for completion.",
      TASK_ALREADY_CLAIMED_CANNOT_CLAIM_IT_AGAIN: "User has already claimed this task and cannot claim it again."
    },
    WALLET: {
      INSUFFICIENT_FUNDS: "Not enough Pi in your wallet to create this task.",
      INVALID_WALLET_ADDRESS: "Invalid Pi wallet address.",
      WALLET_NOT_CONNECTED: "No wallet connected.",
      ESCROW_ERROR: "Failed to lock Pi into escrow.",
    },
  
    DATABASE: {
      CONNECTION_FAILED: "Failed to connect to the database.",
      DUPLICATE_ENTRY: "This record already exists.",
      SAVE_FAILED: "Failed to save data. Please try again.",
      UPDATE_FAILED: "Failed to update record.",
    }
  };
  
  module.exports = ERROR_MESSAGES;
  