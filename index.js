const { reportingRate } = require('./utils/config');
const { collectAndReport } = require('./collectMetrics');

setInterval(collectAndReport, reportingRate);