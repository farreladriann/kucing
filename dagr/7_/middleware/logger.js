const logEvents = require('./logEvents');
const EventEmitter = require('events');

const MyEmitter = new EventEmitter();

MyEmitter.on('log', (msg, fileName) => {
	logEvents(msg, fileName);
});


const logger = (req, res, next) => {
    // logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    MyEmitter.emit('log', `${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    next();
}

module.exports = logger;