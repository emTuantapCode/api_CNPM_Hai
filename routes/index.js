const userRouter = require('./user')
const cartoonRouter = require('./cartoon')

const initWebRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/cartoon', cartoonRouter)
}

module.exports = initWebRoutes