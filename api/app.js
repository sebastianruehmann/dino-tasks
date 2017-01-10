const express = require('express')
const bodyParser = require('body-parser')

const database = require('./common/database')
const log = require('./common/logging')
const settings = require('./settings')


const Revision = require('./models/revision')

const server = express();
const base = '/api/v' + settings.version;

server.use(bodyParser.json());

if (settings.allowCrossOrigin === true) {
	log.info('enabling cross origin resource sharing for everyone');
	server.use(require('cors')());
}


// Resource related Routes
server.use(base + '/tasklists', require('./routes/tasklists/router.js'));
// server.use(base + '/revisions', require('./routes/revisions/router.js'));
server.use(base + '/tasks', require('./routes/tasks/router.js'));

server.listen(process.env.PORT || settings.port, function(){
  log.info('%s server started', settings.environment, { server: this.address(), environment: settings.environment });
});

module.exports = server;
