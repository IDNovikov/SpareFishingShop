const Router = require('express')
const router = new Router 
const postController = require("../controllers/postController")
const checkRole = require('../middleWare/checkRoleMiddleware')

router.post('/',checkRole("ADMIN"), postController.create)
router.get('/', postController.getAll)
router.get('/:id', postController.getOne) //example: GET:http://localhost:5000/api/product/5
router.delete('/',checkRole("ADMIN"), postController.delete)


module.exports = router