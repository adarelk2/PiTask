const fs = require('fs').promises; 
const path = require('path');

class LogReader
{
    constructor(_dir = "logs")
    {
        this.dir = _dir;
        this.data = {}
    }

    async getLogsFiles(_format = "json") {
        try {
        const files = await fs.readdir(this.dir);

        // filter by extension
        return files.filter(file => file.endsWith(`.${_format}`));
        } catch (err) {
        console.error('Error reading directory:', err);
        return [];
        }
    }
    
    async loadLog(_file)
    {
        try 
        {
            const data = await fs.readFile(`${this.dir}/${_file}`, 'utf-8');
            const key = _file.replace(".json", "");
            this.data[key] = JSON.parse(data);
        } 
        catch (err) 
        {
            console.error('Error reading directory:', err);
            return [];
        }
    }

    async loader(_filter={})
    {
        if (!("format" in _filter))
            _filter.format = "json"

        this.data = {};
        const logs_file = await this.getLogsFiles(_filter.format);

        for(let i=0;i<logs_file.length;i++)
        {
            await this.loadLog(logs_file[i]);
        }
    }
    
    getData()
    {
        return this.data;
    }
}

module.exports = LogReader;
