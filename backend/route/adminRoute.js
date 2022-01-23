const AdminController = require("../controller/adminController");
const router = require('express').Router()

const adminController=new AdminController()
router.post('/createCatalog',adminController.createCatalog)
module.exports=router