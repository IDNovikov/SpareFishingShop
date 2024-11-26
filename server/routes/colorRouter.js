const Router = require('express')
const router = new Router 
const colorController = require('../controllers/colorController')
const checkRole = require('../middleWare/checkRoleMiddleware')


router.post('/', checkRole("ADMIN"), colorController.create)
router.get('/', colorController.getAll)
router.delete('/', checkRole("ADMIN"), colorController.delete)


module.exports = router