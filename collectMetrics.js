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

module.exports.collectAndReport = async function () {
    const cpu = await cpuUsage();
    const players = await pingServer();
    const memory = os.totalmem() * (os.freemem() / 100);
    console.log(`cpu: ${cpu}, players: ${players}, memory: ${memory}`)
}