const os = require('os');
const osUtils = require('os-utils');

const { MinecraftServer } = require('mcping-js');
const { serverPort } = require('./utils/config');

function pingServer() {
    return new Promise(resolve => {
        const server = new MinecraftServer('amtest.jumper251.mcservers.me', serverPort);

        server.ping(4000, '47', (err, data) => {
            if (err || !data) return resolve();

            resolve(data);
        })
    })
}

function cpuUsage() {
    return new Promise(resolve => {
        osUtils.cpuUsage(function (v) {
            resolve(v);
        })
    })
}

function memoryUsage() {
    const used = os.totalmem() - os.freemem();
    return used * 100 / os.totalmem();
}

module.exports.collectAndReport = async function () {
    const cpu = await cpuUsage();
    const players = await pingServer();
    const memory = memoryUsage();
    console.log(`cpu: ${cpu}, players: ${players.players.online}, memory: ${memory}`)
}