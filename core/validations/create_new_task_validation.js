class CreateNewTaskValidation {
  constructor(_params) {
    this.params = _params;
    this.errors_lang = _params.errors
    this.errors = [];
    return this;
  }

  async validate() {
    const {
      reward,
      max_users,
      required_level,
      title,
      description,
      proof_description,
      url,
      user
    } = this.params;

    const maxReward = await this.params.userService.calculatorMaxRewardByLevel(1)

    const feeMultiplier = parseFloat(process.env.PAYMENT_FEE || "1.15");

    const rewardNum = parseFloat(reward);
    const maxUsersNum = parseInt(max_users);
    const requiredLevelNum = parseInt(required_level);
    const userBalance = parseFloat(user.balance || 0);
    if(maxReward < rewardNum)
    {
      this.errors.push(this.errors_lang.TASK.MAX_REWARD + maxReward);
    }
    // 1. Validate numbers
    if (isNaN(rewardNum) || rewardNum <= 0) {
      this.errors.push(this.errors_lang.TASK.INVALID_REWARD);
    }

    if (isNaN(maxUsersNum) || maxUsersNum < 1) {
      this.errors.push(this.errors_lang.TASK.MAX_USERS_REQUIRED);
    }

    if (isNaN(requiredLevelNum) || ![1, 2, 3].includes(requiredLevelNum)) {
      this.errors.push(this.errors_lang.VALIDATION.INVALID_LEVEL);
    }

    // 2. Validate title & description
    if (!title || title.trim().length < 5) {
      this.errors.push(this.errors_lang.VALIDATION.TITLE_TOO_SHORT);
    }

    if (!description || description.trim().length < 10) {
      this.errors.push(this.errors_lang.VALIDATION.DESCRIPTION_TOO_SHORT);
    }

    // // 3. Wallet verification
    // if (!user.pi_wallet_address || user.pi_wallet_address === "UNVERIFIED") {
    //   this.errors.push(this.errors.WALLET.WALLET_NOT_CONNECTED);
    // }

    // 4. Balance check
    const totalCost = rewardNum * maxUsersNum * feeMultiplier;

    if (userBalance < totalCost) {
      this.errors.push(this.errors_lang.WALLET.INSUFFICIENT_FUNDS);
    }

    // // 5. Logical level restriction
    // if (requiredLevelNum > user.level) {
    //   this.errors.push(this.errors.TASK.CANNOT_TARGET_HIGHER_LEVEL);
    // }

    // 6. Proof requirement
    if (requiredLevelNum > 1 && (!proof_description || proof_description.trim() === "")) {
      this.errors.push(this.errors_lang.TASK.PROOF_REQUIRED);
    }

    // 7. Proof requirement for url
    if (requiredLevelNum === 1) {
        if (!url || url.trim() === "") {
        this.errors.push(this.errors_lang.TASK.URL_REQUIRED);
        } else {
        try {
            const parsedUrl = new URL(url); // זורק שגיאה אם לא תקין
            if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            this.errors.push(this.errors_lang.TASK.URL_INVALID);
            }
        } catch (e) {
            this.errors.push(this.errors_lang.TASK.URL_INVALID);
        }
        }
    }

    // 7. Cost sanity limit
    if (totalCost > 1000) {
      this.errors.push(this.errors_lang.TASK_TOO_EXPENSIVE);
    }
    console.log(this.errors);
    return this;
  }
}

module.exports = CreateNewTaskValidation;
