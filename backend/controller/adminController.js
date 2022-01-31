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

    getFabrics=async(req,res)=>{
        let result = await adminRepository.getFabrics(req.body)
        console.log(result,'in get fabrics in admin controller')
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
}
module.exports= AdminController