module.exports = {
    token: process.env.ANALYTICS_TOKEN,
    reportingRate: process.env.REPORTING_RATE,
    server: process.env.SERVER,
    reportUrl: process.env.REPORT_URL,
    serverPort: process.env.SERVER_PORT || 25565,
    host: process.env.HOST || 'localhost'
}