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
}

module.exports= AdminRepository









