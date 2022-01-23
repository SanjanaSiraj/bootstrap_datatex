const BuyerController = require("../controller/buyerController");
const router = require('express').Router()

const buyerController=new BuyerController()
router.post('/order',buyerController.order)
router.get('/catalogs',buyerController.getCatalogs)

module.exports=router