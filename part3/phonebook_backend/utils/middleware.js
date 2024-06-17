const logger = require('./logger')

const errorHandler = (err, req, res, next) => {
    console.error(err.message)
    if (err.name === 'CastError') {
        return res.json({ error: 'Malformatted ID' })
    } else if (err.name === 'ValidationError') {
        return res.json({ error: err.message })
    }
    next(err)
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown Endpoint' })
}

const requestLogger = async (request, respose, next) => {
    let method = request.method
    let path = request.path
    let body = await request.body
    logger.info(`[${method}] ${path}`, Object.keys(body).length ? `: ${JSON.stringify(body)}` : '')
    next()
}

module.exports = { errorHandler, unknownEndpoint , requestLogger }