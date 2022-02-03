const AdminController = require("../controller/adminController");
const router = require('express').Router()

const adminController=new AdminController()
router.post('/createCatalog',adminController.createCatalog)
router.get('/getFabric',adminController.getFabrics)
router.post('/setApprove',adminController.setApproveStatus)
router.post('/addProduction',adminController.createProduct)
router.get('/getProduction',adminController.getProductions)
router.post('/assignProduction',adminController.getFinishingTIme)
router.post('/getApproved',adminController.createApproval)
router.post('/getApprovals',adminController.getApprovals)
module.exports=router