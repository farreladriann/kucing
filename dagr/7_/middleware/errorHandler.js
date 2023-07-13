const logEvents = require('./logEvents');
const EventEmitter = require('events');

const MyEmitter = new EventEmitter();

MyEmitter.on('log', (msg, fileName) => {
	logEvents(msg, fileName);
});

const errorHandler = (err, req, res, next) => {
    // logEvents(`${err.name} : ${err.message}`, 'errLog.txt');
    MyEmitter.emit('log', `${err.name} : ${err.message}`, 'errLog.txt');
    console.error(err.stack);
    res.status(500).send(err.message);
};

module.exports = errorHandler;