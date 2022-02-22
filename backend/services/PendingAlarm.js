const Repository = require("../repository/connection");

class PendingAlarm extends Repository {
    constructor() {
        super();
    }
    async test(){
        const query ='select * from approval where prod_end_date between :0 and :1'
        const params=[Date.now()/1000,Date.now()/1000+120]
        const result=await this.sqlQuery(query,params)
        console.log(result,'hi')
        result.data.map(a=>{
            console.log('setting time out :',a.PROD_END_DATE*1000-Date.now())
            const self=this
            console.log(a.APPROVAL_ID,' approval id')
            setTimeout(async function(){
                console.log('here')

                const query ='update  approval set delivery_status=:0 where approval_id=:1'
                const params=["true",a.APPROVAL_ID]
                const result=await self.sqlQuery(query,params)
                console.log(result)
            },parseInt(a.PROD_END_DATE-Date.now()/1000)*1000)
            //setTimeout(function (){console.log('here2')},1000*5*30*24*3600)
        })
        //setTimeout(function() { your_func(); }, 5000);

    }
}
module.exports=PendingAlarm