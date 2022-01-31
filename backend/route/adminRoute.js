const AdminController = require("../controller/adminController");
const router = require('express').Router()

const adminController=new AdminController()
router.post('/createCatalog',adminController.createCatalog)
router.get('/getFabric',adminController.getFabrics)
router.post('/setApprove',adminController.setApproveStatus)
module.exports=router