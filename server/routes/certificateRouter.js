const Router = require('express')
const router = new Router 
const CertificateController = require('../controllers/certificateController')
const checkRole = require('../middleWare/checkRoleMiddleware')

router.post('/', CertificateController.postCertificate)
router.get('/', checkRole("ADMIN"), CertificateController.getAllCertificate)
router.post('/check', CertificateController.checkCertificate)
router.delete('/', checkRole("ADMIN"), CertificateController.deleteCertificate)

module.exports = router