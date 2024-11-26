const Router = require('express')
const router = new Router 
const productController = require("../controllers/productController")
const checkRole = require('../middleWare/checkRoleMiddleware')

router.post('/',checkRole("ADMIN"), productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne) //example: GET:http://localhost:5000/api/product/5
router.delete('/',checkRole("ADMIN"), productController.delete)


module.exports = router

