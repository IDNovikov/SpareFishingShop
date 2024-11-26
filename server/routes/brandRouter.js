const Router = require('express')
const router = new Router 
const brandController = require("../controllers/brandController")
const checkRole = require('../middleWare/checkRoleMiddleware')

router.post('/', checkRole("ADMIN"), brandController.create)
router.get('/', brandController.getAll)
router.delete('/',checkRole("ADMIN"), brandController.delete)


module.exports = router