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
                        success: false
                    });
                    break;
            }
        }
    }

    getCatalogs = async(req, res) => {
        let result = await buyerRepository.getCatalogs(req.body)
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