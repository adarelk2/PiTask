const ERROR_MESSAGES = require("../../constants/errors");

class CreateNewTaskValidation {
  constructor(_params) {
    this.params = _params;
    this.errors = [];
    return this;
  }

  validate() {
    const {
      reward,
      max_users,
      required_level,
      title,
      description,
      proof_description,
      user
    } = this.params;

    const feeMultiplier = parseFloat(process.env.PAYMENT_FEE || "1.15");

    const rewardNum = parseFloat(reward);
    const maxUsersNum = parseInt(max_users);
    const requiredLevelNum = parseInt(required_level);
    const userBalance = parseFloat(user.balance || 0);

    // 1. Validate numbers
    if (isNaN(rewardNum) || rewardNum <= 0) {
      this.errors.push(ERROR_MESSAGES.TASK.INVALID_REWARD);
    }

    if (isNaN(maxUsersNum) || maxUsersNum < 1) {
      this.errors.push(ERROR_MESSAGES.TASK.MAX_USERS_REQUIRED);
    }

    if (isNaN(requiredLevelNum) || ![1, 2, 3].includes(requiredLevelNum)) {
      this.errors.push(ERROR_MESSAGES.VALIDATION.INVALID_LEVEL);
    }

    // 2. Validate title & description
    if (!title || title.trim().length < 5) {
      this.errors.push(ERROR_MESSAGES.VALIDATION.TITLE_TOO_SHORT);
    }

    if (!description || description.trim().length < 10) {
      this.errors.push(ERROR_MESSAGES.VALIDATION.DESCRIPTION_TOO_SHORT);
    }

    // // 3. Wallet verification
    // if (!user.pi_wallet_address || user.pi_wallet_address === "UNVERIFIED") {
    //   this.errors.push(ERROR_MESSAGES.WALLET.WALLET_NOT_CONNECTED);
    // }

    // 4. Balance check
    const totalCost = rewardNum * maxUsersNum * feeMultiplier;
    if (userBalance < totalCost) {
      this.errors.push(ERROR_MESSAGES.WALLET.INSUFFICIENT_FUNDS);
    }

    // // 5. Logical level restriction
    // if (requiredLevelNum > user.level) {
    //   this.errors.push(ERROR_MESSAGES.TASK.CANNOT_TARGET_HIGHER_LEVEL);
    // }

    // 6. Proof requirement
    if (requiredLevelNum > 1 && (!proof_description || proof_description.trim() === "")) {
      this.errors.push(ERROR_MESSAGES.TASK.PROOF_REQUIRED);
    }

    // 7. Cost sanity limit
    if (totalCost > 1000) {
      this.errors.push(ERROR_MESSAGES.TASK.TASK_TOO_EXPENSIVE);
    }

    return this;
  }
}

module.exports = CreateNewTaskValidation;
