const Router = require('express')
const router = new Router 
const basketController = require('../controllers/basketController')
const checkRole = require('../middleWare/checkRoleMiddleware')

router.post('/', basketController.postBasket)
router.get('/', checkRole("ADMIN"), basketController.getAllBaskets)
router.delete('/:id',checkRole("ADMIN"), basketController.deleteBasket)
//http://localhost:5000/api/basket/4


module.exports = router