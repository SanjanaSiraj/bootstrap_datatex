const AdminRepository=require('../repository/adminRepository')
const adminRepository=new AdminRepository()
class AdminController {
    constructor() {
    }
    createCatalog=async(req,res)=>{
        let result=await adminRepository.createCatalog(req.body);
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

    deleteCard= async(req,res)=>{
        console.log(req.body)
        let result = await adminRepository.deleteCard(req.body)
       // console.log(result,'in delete card in admin contro')
        if (result.success) {
            res.status(200).json({
                success:true
            });
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }

    getFabrics=async(req,res)=>{
        let result = await adminRepository.getFabrics(req.body)
        //console.log(result,'in get fabrics in admin controller')
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

    setApproveStatus=async(req,res)=>{
        let result=await adminRepository.setApproveStatus(req.body);
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
    createProduct=async(req,res)=>{
        let result=await adminRepository.createProduction(req.body);
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
    getProductions = async(req, res) => {
        let result = await adminRepository.getProductions();
        if (result.success) {
            res.status(200).json({
                result:result.data,
                success:true
            });
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }
    getFinishingTIme=async(req,res)=>{
        let result = await adminRepository.getApproximateDate(req.body);
        if (result.success) {
            res.status(200).json({
                result:result.data,
                success:true
            });
        } else {
            res.status(404).json({
                success: false,
            });
        }
    }

    createApproval=async(req,res)=>{
        let result=await adminRepository.insetApproval(req.body);
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
    getApprovals=async(req,res)=>{
        let result=await adminRepository.getApprovals(req.body);
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
    getCatalogs = async(req, res) => {
        let result = await adminRepository.getCatalogs(req.body)
        //console.log(result,'in get catalogs in admin controller')
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

    getSales = async(req, res) => {
        let result = await adminRepository.getSales(req.body)
        console.log(result,'in get catalogs in admin controller')
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
module.exports= AdminController