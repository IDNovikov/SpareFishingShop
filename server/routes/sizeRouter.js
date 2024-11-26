const Router = require('express')
const router = new Router 
const sizeController = require('../controllers/sizeController')
const checkRole = require('../middleWare/checkRoleMiddleware')

router.post('/', checkRole("ADMIN"), sizeController.create)
router.get('/', sizeController.getAll)
router.delete('/', checkRole("ADMIN"), sizeController.delete)


module.exports = router