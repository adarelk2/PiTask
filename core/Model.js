const db = require('./DB');

class Model {
  constructor(tableName, fields = {}) {
    if (!tableName) throw new Error("Model requires a table name");
    this.table = tableName;
    this.fields = fields;
    this.db = db;
  }

  getValidFields(data) {
    return Object.entries(this.fields)
      .filter(([key]) => key in data)
      .map(([key, [type, col]]) => [key, col, data[key]]);
  }

  async select(where = {}) {
    const keys = Object.keys(where);
    let query = `SELECT * FROM ${this.table}`;
    let values = [];

    if (keys.length > 0) {
      const validKeys = keys.filter(k => this.fields[k]);
      const conditions = validKeys
        .map(k => `${this.fields[k][1]} = ?`)
        .join(' AND ');
      values = validKeys.map(k => where[k]);
      query += ` WHERE ${conditions}`;
    }

    const [rows] = await this.db.query(query, values);
    return rows;
  }

  async insert(data) {
    const valid = this.getValidFields(data);
  
    if (valid.length === 0) throw new Error("No valid fields to insert");
  
    const columns = valid.map(([, col]) => col);
    const values = valid.map(([, , value]) => value);
    const placeholders = columns.map(() => '?').join(', ');
  
    const query = `INSERT INTO ${this.table} (${columns.join(', ')}) VALUES (${placeholders})`;
    const [result] = await this.db.query(query, values);
    return result.insertId || result; // אם אין insertId נחזיר את כל התוצאה
  }
  
  async update(where, data) {
    const valid = this.getValidFields(data);
    const setClause = valid.map(([, col]) => `${col} = ?`).join(', ');
    const setValues = valid.map(([, , value]) => value);

    const whereKeys = Object.keys(where);
    const whereClause = whereKeys
      .filter(k => this.fields[k])
      .map(k => `${this.fields[k][1]} = ?`)
      .join(' AND ');
    const whereValues = whereKeys.map(k => where[k]);

    const query = `UPDATE ${this.table} SET ${setClause} WHERE ${whereClause}`;
    const [result] = await this.db.query(query, [...setValues, ...whereValues]);
    return result.affectedRows;
  }
}

module.exports = Model;
