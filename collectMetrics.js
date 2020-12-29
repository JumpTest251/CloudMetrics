const os = require('os');
const { cpu } = require('node-os-utils');

const { MinecraftServer } = require('mcping-js');
const { serverPort } = require('./utils/config');
const reportMetrics = require('./utils/reportMetrics');

function pingServer() {
    return new Promise(resolve => {
        const server = new MinecraftServer('amtest.jumper251.mcservers.me', serverPort);

        server.ping(3000, '47', (err, data) => {
            if (err || !data) return resolve();

            resolve(data);
        })
    })
}

function memoryUsage() {
    const used = os.totalmem() - os.freemem();
    return used * 100 / os.totalmem();
}

module.exports.collectAndReport = async function () {
    const cpuUsage = await cpu.usage();
    const players = await pingServer();
    const memory = memoryUsage();
    console.log(`cpu: ${cpuUsage}, players: ${players ? players.players.online : ''}, memory: ${memory}`)

    const metrics = [];
    metrics.push({ type: 'cpu', value: cpuUsage }, { type: 'memory', value: memory });

    if (players) metrics.push({ type: 'players', value: players.players.online });

    reportMetrics(metrics);
}