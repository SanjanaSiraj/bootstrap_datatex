const BuyerController = require("../controller/buyerController");
const router = require('express').Router()

const buyerController=new BuyerController()
router.post('/order',buyerController.order)
router.post('/catalogs',buyerController.getCatalogs)
router.post('/fabrics',buyerController.getFabrics)
router.post('/oneCat',buyerController.getCatalogOne)
router.post('/removeCat',buyerController.setRemoveStatus)
router.post('/getAllOrders',buyerController.getAllOrders)
router.post('/get2Orders',buyerController.getApprovedNotStartOrders)
router.post('/get3Orders',buyerController.getInProductOrders)
router.post('/get4Orders',buyerController.getFInishedOrders)
router.post('/get5Orders',buyerController.getRejectedOrders)
module.exports=router