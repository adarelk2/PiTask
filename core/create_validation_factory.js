const create_new_task_validation = require('./validations/create_new_task_validation');
const claim_task_validation = require('./validations/claim_task_validation');


class createValidationFactory
{
  constructor(_validate_name, _params)
  {
    this.validate_name = _validate_name
    this.params = _params
    return this;
  }
  
  create()
  {
    switch(this.validate_name)
    {
      case 'create_new_task_validation':
        return new create_new_task_validation(this.params);
      case 'claim_task_validation':
        return new claim_task_validation(this.params);

    }
  }
}

module.exports = createValidationFactory;
