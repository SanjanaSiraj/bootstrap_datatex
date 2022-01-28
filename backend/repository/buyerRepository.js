const Repository = require("./connection");

class BuyerRepository extends Repository {
    constructor() {
        super();
    }

    order=async (data)=>{

        const query='insert into fabric (color_id,cotton_pct,polyester_pct,rayon_pct,tencil_pct,'+
            'viscose_pct,lycra_pct,gsm_weight,total_price,order_date,buyer_name,buyer_address,affliation ) values (:0,:1,:2,:3,:4,:5,:6,:7,:8,:9,:10,:11,:12)'
        const params=[data.color_id,data.cotton_pct,data.polyester_pct,data.rayon_pct,data.tencil_pct,
            data.viscose_pct,data.lycra_pct,data.gsm_weight,data.total_price,data.order_date,data.buyer_name,data.buyer_address,data.affliation]
        var result=await this.sqlQuery(query,params)
        return result
    }

    getCatalogs=async(data)=>{
        const query='select * from catalog where weave_design=:0'
        const params=[data.weave_design]
        const result=await this.sqlQuery(query,params)
        console.log(result,'in get catalog in buyer repository cls')
        return result
    }

}
module.exports= BuyerRepository