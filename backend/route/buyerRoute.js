const BuyerController = require("../controller/buyerController");
const router = require('express').Router()

const buyerController=new BuyerController()
router.post('/order',buyerController.order)
router.post('/catalogs',buyerController.getCatalogs)
router.post('/fabrics',buyerController.getFabrics)
router.post('/oneCat',buyerController.getCatalogOne)
router.post('/removeCat',buyerController.setRemoveStatus)
module.exports=router