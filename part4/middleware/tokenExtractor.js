const getToken = (request, response, next) => {
    const auth = request.get('authorization')
    if (!auth || !auth.toLowerCase().startsWith('bearer ')) return response.status(401).json({ error: 'Token missing or invalid' })
    request.token = auth.replace('Bearer ', '')
    next()
}

module.exports = getToken