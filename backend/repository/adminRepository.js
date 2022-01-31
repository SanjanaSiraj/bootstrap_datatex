const Repository = require("./connection");

class AdminRepository extends Repository {
    constructor() {
        super();
    }
    createCatalog=async(data)=>{
        const query='insert into catalog (color,price_per_gsm,weave_design,image) values (:0,:1,:2,:3)'
        const params=[data.color,data.price_per_gsm,data.weave_design,data.image]
        const result=await this.sqlQuery(query,params)
        console.log(result,'in create catalog in admin repository cls')
        return result
    }

    getFabrics=async()=>{
        const query='select * from fabric where approve_status=:0'
        const params=[0]
        try{
            const result=await this.sqlQuery(query,params)
            console.log(result,'in get fabric in admin repository cls')
            return result
        }catch (e) {
            console.log(e,'in get fabric in admin repository cls')
        }

    }

    setApproveStatus=async(data)=>{
        const query='update fabric set approve_status=:0 where fabric_id=:1'
        const params=[data.approve_status,data.fabric_id]
        try{
            const result=await this.sqlQuery(query,params)
            console.log(result,'in  setApproveStatus in admin repository cls')
            return result
        }catch (e) {
            console.log(e,'in  setApproveStatus in admin repository cls')
        }
    }
}

module.exports= AdminRepository









