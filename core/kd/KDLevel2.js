class KDLevel2
{
  constructor(_id, _level, _tasks=[])
  {
    this.id = _id;
    this.level = _level;
    this.tasks = _tasks;
  }

  getKD()
  {
    let approved = 1;
    let reject = 1;
    this.tasks.map(task=>{
      if(task.level == 2 && task.status =="approved")
        approved+=1;
      else if(task.level == 2 && task.status =="reject")
        reject+=1;
      })

    return (approved/reject*0.5).toFixed(2)

  }
}

module.exports = KDLevel2;
