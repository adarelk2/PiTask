const BaseController = require('../core/BaseController');
const LogReader = require('../core/LogReader');
const { PERMISSIONS } = require('../config/permissions');

class LogAnalysis extends BaseController {
    constructor(_req, _res) 
    {
        super(_req, _res);
        this.checkPermissions(PERMISSIONS.ADMIN, LogAnalysis)
    }

    print()
    {
        this.render('log_analysis', {
        user: this.req.user,
        title:"Log analysis",
        headerTitle: "TaskPi",
    });
    }

    async usersByControllerAndMethod(_params) {
        const logger = new LogReader("logs");
        await logger.loader();
        const data = logger.getData();

        const targetController = (_params.page || 'home').toLowerCase();
        const targetMethod = (_params.method || '').toLowerCase();

        const stats = {};

        for (const [date, entries] of Object.entries(data)) {
            const usersByMethod = {};

            for (const entry of entries) {
                // בדוק controller
                const ctrl = (entry.controller || entry.params?.controller || "unknown").toLowerCase();
                const method = (entry.method || "unknown").toLowerCase();
                const user = entry.user?.username || "anonymous";

                // debug

                if (ctrl === targetController) {
                    // אם שלחת method מסוים
                    if (targetMethod && method !== targetMethod) continue;

                    if (!(method in usersByMethod)) {
                        usersByMethod[method] = new Set();
                    }
                    usersByMethod[method].add(user);
                }
            }

            if (Object.keys(usersByMethod).length > 0) {
                stats[date] = {};
                for (const [method, users] of Object.entries(usersByMethod)) {
                    stats[date][method] = {
                        uniqueUsers: users.size,
                        users: [...users]
                    };
                }
            } 
        }

        this.render('log_users_by_controller_method', {
            title: targetMethod
                ? `TaskPi - Users for ${targetController}.${targetMethod}`
                : `TaskPi - Users for ${targetController} (all methods)`,
            user: this.req.user,
            stats,
            headerTitle: "TaskPi",
            layout:false
        });
    }

    async actionsByUser(_params) 
    {
        const logger = new LogReader("logs");
        await logger.loader();
        const data = logger.getData();

        const targetUser = (_params.user || '').toLowerCase();
        const stats = {};

        for (const [date, entries] of Object.entries(data)) {
            const actions = [];

            for (const entry of entries) {
                const ctrl = (entry.controller || entry.params?.controller || "unknown").toLowerCase();
                const method = (entry.method || "unknown").toLowerCase();
                const user = (entry.user?.username || "anonymous").toLowerCase();

                if (!targetUser || user === targetUser) {
                    actions.push({
                        controller: ctrl,
                        method,
                        user
                    });
                }
            }

            if (actions.length > 0) {
                stats[date] = actions;
            }
        }

        this.render('log_actions_by_user', {
            title: targetUser
                ? `TaskPi - Actions for user ${targetUser}`
                : `TaskPi - Actions (all users)`,
            user: this.req.user,
            stats,
            headerTitle: "TaskPi",
            layout:false
        });
    }


}

module.exports = LogAnalysis;
