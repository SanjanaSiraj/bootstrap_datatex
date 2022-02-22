const BuyerRepository=require('../repository/buyerRepository')
const buyerRepository=new BuyerRepository()
class BuyerController {
    constructor() {
    }
    order = async(req, res) => {
        let result = await buyerRepository.order(req.body)
        if (result.success) {
            res.status(200).json({
                success:true
            });
        } else {
            switch (result.error){
                case process.env.ERROR_NOT_FOUND_COLOR_ID:
                    res.status(406).json({
                        success: false,
                        error:'not found color id'
                    });
                    break;

                default:
                    res.status(404).json({
                        success: false,
                        error:result
                    });
                    break;
            }
        }
    }

    setRemoveStatus=async(req,res)=>{
        let result=await buyerRepository.setRemoveStatus(req.body);
        if (result.success) {
            res.status(200).json({
                success:true
            });
        } else {
            res.status(404).json({
                success: false,
                error:result.error
            });
        }
    }

    getCatalogs = async(req, res) => {
        let result = await buyerRepository.getCatalogs(req.body)
        console.log(result,'in get catalogs in buyer controller')
        if (result.success) {
            res.status(200).json({
                success:true,
                result:result.data
            });
        } else {
            res.status(404).json({
                success: false,
                error:result.error
            });
        }
    }

    getCatalogOne = async(req, res) => {
        let result = await buyerRepository.getsPECIFICcATALOG(req.body)
        console.log(result,'in get catalogs in buyer controller')
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({
                success: false,
                error:result.error
            });
        }
    }


    getFabrics=async(req,res)=>{
        let result = await buyerRepository.getFabrics(req.body)
        console.log(result,'in get fabrics in buyern controller')
        if (result.success) {
            res.status(200).json({
                success:true,
                result:result.data
            });
        } else {
            res.status(404).json({
                success: false,
                error:result.error
            });
        }
    }

    getAllOrders=async(req,res)=>{
        let result = await buyerRepository.getAllOrders(req.body)
        console.log(result,'in getAllOrders in buyern controller')
        if (result.success) {
            res.status(200).json({
                success:true,
                result:result.data
            });
        } else {
            res.status(404).json({
                success: false,
                error:result.error
            });
        }
    }

    getApprovedNotStartOrders=async(req,res)=>{
        let result = await buyerRepository.getApprovedNotStartOrders(req.body)
        console.log(result,'in getApprovedNotStartOrders in buyern controller')
        if (result.success) {
            res.status(200).json({
                success:true,
                result:result.data
            });
        } else {
            res.status(404).json({
                success: false,
                error:result.error
            });
        }
    }

    getInProductOrders=async(req,res)=>{
        let result = await buyerRepository.getInProductOrders(req.body)
        console.log(result,'in getInProductOrders in buyern controller')
        if (result.success) {
            res.status(200).json({
                success:true,
                result:result.data
            });
        } else {
            res.status(404).json({
                success: false,
                error:result.error
            });
        }
    }
    getFInishedOrders=async(req,res)=>{
        let result = await buyerRepository.getFinishedOrders(req.body)
        console.log(result,'in getFInishedOrderss in buyern controller')
        if (result.success) {
            res.status(200).json({
                success:true,
                result:result.data
            });
        } else {
            res.status(404).json({
                success: false,
                error:result.error
            });
        }
    }
    getRejectedOrders=async(req,res)=>{
        let result = await buyerRepository.getRejectedOrders(req.body)
        console.log(result,'in getRejectedOrders in buyern controller')
        if (result.success) {
            res.status(200).json({
                success:true,
                result:result.data
            });
        } else {
            res.status(404).json({
                success: false,
                error:result.error
            });
        }
    }

}

module.exports= BuyerController