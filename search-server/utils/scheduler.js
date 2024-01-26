const schedule = require('node-schedule');

const StartScheduler = (cronExp, func) => {
    // cronExp：如 */5 * * * *
    // func：如 () => {}
    const job = schedule.scheduleJob(cronExp, func)
    return job
}

const StopScheduler = (job) => {
    job.cancel();
}

module.exports = {
    StartScheduler, StopScheduler
}