class KDLevel4
{
  constructor(_id, _level, _tasks=[])
  {
    this.id = _id;
    this.level = _level;
    this.tasks = _tasks;
  }

  getKD() {
    let approved = 0;
    let rejected = 0;
  
    this.tasks.forEach(task => {
      if (task.level === 2 && task.status === "approved") approved++;
      else if (task.level === 2 && task.status === "reject") rejected++;
    });
  
    const total = approved + rejected;
    // 🔒 נוסחת התחלה: אם אין עדיין משימות ברמה 2
    if (total === 0) {
      return 0.75;  // ערך קבוע התחלתי — מספיק בשביל משימות זולות
    }
  
    const accuracy = approved / total;
    const kd = accuracy * Math.log2(total + 1);
    return kd.toFixed(2);
  }
  
  
}

module.exports = KDLevel4;
