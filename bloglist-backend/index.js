const app = require('./app')

// Commented out for deta.sh deployment
/*
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT)
logger.info(`Server running on port ${config.PORT}`)
module.exports = server
*/

module.exports = app