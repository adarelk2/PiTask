class ClaimTaskValidation {
  constructor(_params) {
    this.params = _params;
    this.errors_lang = _params.errors
    this.errors = [];
    this.errors = _params.errors

    return this;
  }

  validate() 
  {
    if(this.params.task.publisher_id == this.params.user.id)
    {
      this.errors.push(this.errors_lang.GENERAL.UNKNOWN_ERROR);
    }

    if(this.params.user.level < this.params.task.required_level)
    {
      this.errors.push(this.errors_lang.TASK.USER_LEVEL_TOO_LOW);
    }

    if(this.params.kd < this.params.task.reward && this.params.user.level < this.params.task.required_level)
    {
      this.errors.push(this.errors_lang.TASK.USER_KD_TOO_LOW);
    }

    if(this.params.task.status !="active")
    {
      this.errors.push(this.errors_lang.TASK.TASK_ALREADY_COMPLETED);
    }

    const alreadyClaimed = this.params.tasks.some(task => 
      {
        return (task.user_id === this.params.user.id && task.status === 'pending' && task.level == this.params.task.required_level)
      }
    );
    
    if (alreadyClaimed) {
      this.errors.push(this.errors_lang.TASK.TASK_ALREADY_CLAIMED);
    }

    const alreadyClaimedFromThisTask = this.params.tasks.some(task => 
      {
        return (task.user_id === this.params.user.id && task.task_id == this.params.task.id)
      }
    );

    if (alreadyClaimedFromThisTask) {
      this.errors.push(this.errors_lang.TASK.TASK_ALREADY_CLAIMED_CANNOT_CLAIM_IT_AGAIN);
    }
    
    return this;
  }
}

module.exports = ClaimTaskValidation;
