class KDLevel1
{
  constructor(_id, _level, _tasks=[])
  {
    this.id = _id;
    this.level = _level;
    this.tasks = _tasks;
  }

  getKD() 
  {
    const completed = this.tasks.filter(task =>
      task.level === 1 && task.status === "approved"
    ).length;
  
    return ((completed * 0.1) + 0.2).toFixed(2); // לדוגמה: בסיס 0.2, כל משימה מוסיפה 0.1
  }
  
}

module.exports = KDLevel1;
