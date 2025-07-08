const KDLevel1 = require('./kd/KDLevel1');
const KDLevel2 = require('./kd/KDLevel2');
const KDLevel3 = require('./kd/KDLevel3');

class createCalculatorKDFactory
{
  constructor(_id, _level, _tasks)
  {
    this.id = _id
    this.level = _level
    this.tasks = _tasks
  }
  
  create()
  {
    switch(this.level)
    {
      case 1:
        return new KDLevel1(this.id, this.level, this.tasks);
      case 2:
        return new KDLevel2(this.id, this.level, this.tasks);
      case 3:
        return new KDLevel3(this.id, this.level, this.tasks);

    }
  }
}

module.exports = createCalculatorKDFactory;
