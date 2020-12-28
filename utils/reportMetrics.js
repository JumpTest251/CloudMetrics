const axios = require('axios');
const { reportUrl, token, server } = require('./config');

module.exports = async function (metrics) {
    try {
        await axios.post(reportUrl, {
            token,
            server,
            metrics
        })

        console.log('Metrics reported.');
    } catch (ex) {
        console.log(`Failed to report Metrics: ${ex}`);
    }

}