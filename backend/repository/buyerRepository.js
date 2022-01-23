const Repository = require("./connection");

class BuyerRepository extends Repository {
    constructor() {
        super();
    }

    order=async (data)=>{
        //find that color id first
        const query1='select * from catalog where color_id=:0'
        const params1=[data.color_id]
        var result1=await this.sqlQuery(query1,params1)
        if(result1.data.length===0){
            return{
                success:false,
                error:process.env.ERROR_NOT_FOUND_COLOR_ID
            }
        }
        console.log(result1,'in oirder in buyer repo result1')
        var price=result1.data[0]['PRICE_PER_GSM']
        console.log(price)
        const query='insert into fabric (color_id,cotton_pct,polyester_pct,rayon_pct,tencil_pct,'+
            'viscose_pct,lycra_pct,gsm_weight,total_price,order_date,buyer_name,buyer_address,affliation ) values (:0,:1,:2,:3,:4,:5,:6,:7,:8,:9,:10,:11,:12)'
        const params=[data.color_id,data.cotton_pct,data.polyester_pct,data.rayon_pct,data.tencil_pct,
            data.viscose_pct,data.lycra_pct,data.gsm_weight,parseInt(price*data.gsm_weight),data.order_date,data.buyer_name,data.buyer_address,data.affliation]
        var result=await this.sqlQuery(query,params)
        return result
    }

    getCatalogs=async()=>{
        const query='select * from catalog'
        const params=[]
        const result=await this.sqlQuery(query,params)
        console.log(result,'in get catalog in buyer repository cls')
        return result
    }

}
module.exports= BuyerRepository