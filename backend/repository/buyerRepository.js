const Repository = require("./connection");

class BuyerRepository extends Repository {
    constructor() {
        super();
    }

    order=async (data)=>{
        console.log(data,'in buyer rep in line 9')
        const query='insert into fabric (color_id,cotton_pct,polyester_pct,rayon_pct,tencil_pct,'+
            'viscose_pct,lycra_pct,gsm_weight,total_price,order_date,buyer_name,buyer_address,affliation,approve_status,image,user_id,remove_status) values (:0,:1,:2,:3,:4,:5,:6,:7,:8,:9,:10,:11,:12,:13,:14,:15,:16)'
        const params=[data.color_id,data.cotton_pct,data.polyester_pct,data.rayon_pct,data.tencil_pct,
            data.viscose_pct,data.lycra_pct,data.gsm_weight,data.total_price,data.order_date,data.buyer_name,data.buyer_address,data.affliation,0,data.image,data.user_id,0]
        var result=await this.sqlQuery(query,params)
        return result
    }

    setRemoveStatus=async(data)=>{
        console.log(data,'in set approve status in buyer repo in first line')
        const query='update fabric set remove_status=:0 where fabric_id=:1 and user_id=:2'
        const params=[data.remove_status,data.fabric_id,data.user_id]
        try{
            const result=await this.sqlQuery(query,params)
            console.log(result,'in  setApproveStatus in admin repository cls')
            return result
        }catch (e) {
            console.log(e,'in  setApproveStatus in admin repository cls')
        }
    }

    getCatalogs=async(data)=>{
        const query='select * from catalog where weave_design=:0'
        const params=[data.weave_design]
        const result=await this.sqlQuery(query,params)
        console.log(result,'in get catalog in buyer repository cls')
        return result
    }

    getsPECIFICcATALOG=async(data)=>{
        const query='select * from catalog where color_id=:0'
        const params=[data.color_id]
        const result=await this.sqlQuery(query,params)
        console.log(result,'in get catalog in buyer repository cls')
        return result
    }

    getFabrics=async(data)=>{
        const query='select * from fabric where user_id=:0 and remove_status=:1'
        const params=[data.user_id,0]
        try{
            const result=await this.sqlQuery(query,params)
            console.log(result,'in get fabric in buyer repository cls')
            return result
        }catch (e) {
            console.log(e,'in get fabric in buyer repository cls')
        }

    }

}
module.exports= BuyerRepository