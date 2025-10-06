const fs = require('fs');
const Stack = require('./Stack');
const dayjs = require('dayjs');

class Logger
{
    constructor(_dir = "logs", _interval=5000)
    {
        this.dir = _dir;
        this.interval = _interval;
        this.logs = new Stack();
        this.date = dayjs();

        this.init();
    }

    init() 
    {
        if (!fs.existsSync(`./${this.dir}`)) {
            fs.mkdirSync(`./${this.dir}`, { recursive: true });
        }

        this._flushing = false;

        setInterval(async () => {
            if (this._flushing) return;
            this._flushing = true;

            try {
            const batch = [];
            while (!this.logs.isEmpty() && batch.length < 1000) {
                batch.push(this.logs.pop());
            }
            if (batch.length === 0) return;

            batch.reverse();

            const fileName = dayjs().format("DD-MM-YY") + ".json";
            const filePath = `./${this.dir}/${fileName}`;

            let arr = [];
            try {
                const content = await fs.promises.readFile(filePath, "utf-8");
                arr = content.trim() ? JSON.parse(content) : [];
                if (!Array.isArray(arr)) arr = []; 
            } catch (err) {
                if (err.code !== "ENOENT") throw err; 
            }

            arr.push(...batch);
            await fs.promises.writeFile(filePath, JSON.stringify(arr, null, 2));
            } catch (err) {
            console.error("Logger JSON flush error:", err);
            } finally {
            this._flushing = false;
            }
        }, this.interval);
    }

    insert(_params={}) {
        this.logs.push(_params);
    }
}

module.exports = Logger;
