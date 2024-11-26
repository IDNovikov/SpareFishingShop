const Router = require('express')
const router = new Router 
const basketRouter = require('./basketRouter')
const brandRouter = require('./brandRouter')
const colorRouter = require('./colorRouter')
const productRouter = require('./productRouter')
const sizeRouter = require('./sizeRouter')
const typeRouter = require('./typeRouter')
const adminRouter = require('./adminRouter')
const certificateRouter = require('./certificateRouter')
const postRouter = require('./postRouter')


router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/product', productRouter)
router.use('/size', sizeRouter)
router.use('/color', colorRouter)
router.use('/admin', adminRouter)
router.use('/basket', basketRouter)
router.use('/certificate', certificateRouter)
router.use('/blog', postRouter)

module.exports = router 