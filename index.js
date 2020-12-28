const { reportingRate } = require('./utils/config');
const { collectAndReport } = require('./collectMetrics');

setInterval(collectAndReport, reportingRate * 1000);