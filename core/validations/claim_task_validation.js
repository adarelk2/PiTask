const ERROR_MESSAGES = require("../../constants/errors");

class ClaimTaskValidation {
  constructor(_params) {
    this.params = _params;
    this.errors = [];
    return this;
  }

  validate() 
  {
    if(this.params.task.publisher_id == this.params.user.id)
    {
      this.errors.push(ERROR_MESSAGES.GENERAL.UNKNOWN_ERROR);
    }

    if(this.params.user.level < this.params.task.required_level)
    {
      this.errors.push(ERROR_MESSAGES.TASK.USER_LEVEL_TOO_LOW);
    }

    if(this.params.kd < this.params.task.reward)
    {
      this.errors.push(ERROR_MESSAGES.TASK.USER_KD_TOO_LOW);
    }

    if(this.params.task.status !="active")
    {
      this.errors.push(ERROR_MESSAGES.TASK.TASK_ALREADY_COMPLETED);
    }

    const alreadyClaimed = this.params.tasks.some(task => 
      {
        return (task.user_id === this.params.user.id && task.status === 'pending' && task.level == this.params.task.required_level)
      }
    );
    
    if (alreadyClaimed) {
      this.errors.push(ERROR_MESSAGES.TASK.TASK_ALREADY_CLAIMED);
    }
    
    return this;
  }
}

module.exports = ClaimTaskValidation;
