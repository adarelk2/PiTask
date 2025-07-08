class KDLevel1
{
  constructor(_id, _level, _tasks=[])
  {
    this.id = _id;
    this.level = _level;
    this.tasks = _tasks;
  }

  get()
  {
    return (this.tasks.length * 0.1).toFixed(2)
  }
}

module.exports = KDLevel1;
