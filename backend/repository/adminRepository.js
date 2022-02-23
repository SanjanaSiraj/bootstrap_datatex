const Repository = require("./connection");

class AdminRepository extends Repository {
    constructor() {
        super();
    }
    createCatalog=async(data)=>{
        const query='insert into catalog (color,price_per_gsm,weave_design,image,cdate) values (:0,:1,:2,:3,:4)'
        const params=[data.color,data.price_per_gsm,data.weave_design,data.image,Date.now()/1000]
        const result=await this.sqlQuery(query,params)
        //console.log(result,'in create catalog in admin repository cls')
        return result
    }

    deleteCard=async data=>{

        const query='delete from catalog where color_id = :0'
        const params=[data.id]
        var result=await this.sqlQuery(query,params)
        //console.log(result,'in delete in admin repo')
        return result
    }

    getCatalogs=async(data)=>{
        const query='select * from catalog order by cdate desc'
        const params=[]
        const result=await this.sqlQuery(query,params)
        //console.log(result,'in get catalog in admin repository cls')
        return result
    }

    getFabrics=async()=>{
        const query='select * from fabric where approve_status=:0 order by order_date desc'
        const params=[0]
        try{
            const result=await this.sqlQuery(query,params)
            //console.log(result,'in get fabric in admin repository cls')
            return result
        }catch (e) {
           // console.log(e,'in get fabric in admin repository cls')
        }

    }

    setApproveStatus=async(data)=>{
        //console.log(data,'in set approve status in admin repo in first line')
        const query='update fabric set approve_status=:0 where fabric_id=:1'
        const params=[data.approve_status,data.fabric_id]
        try{
            const result=await this.sqlQuery(query,params)
           // console.log(result,'in  setApproveStatus in admin repository cls')
            return result
        }catch (e) {
           // console.log(e,'in  setApproveStatus in admin repository cls')
        }
    }

    createProduction=async(data)=>{
        const query='insert into production (run_status,hourly_gsm_speed,setup_cost,setup_date) values (:0,:1,:2,:3)'
        const params=[data.run_status,data.hourly_gsm_speed,data.setup_cost,data.setup_date]
        const result=await this.sqlQuery(query,params)
        //console.log(result,'in create production in admin repository cls')
        return result
    }

    getProductions=async(data)=>{
        const query='select * from production'
        const params=[]
        var result=await this.sqlQuery(query,params)
        return result
    }

    getApproximateDate=async(data)=>{
        const query1='select production_unit_id,hourly_gsm_speed from production'
        const params1=[]
        var res=await this.sqlQuery(query1,params1)

        var arr=[]
        res.data.map(re=>{
           // console.log(re,'re')
            var element={
                'id':re['PRODUCTION_UNIT_ID'],
                'start_time':Date.now()/1000,
                'finish_time':Date.now()/1000+data.gsm/re['HOURLY_GSM_SPEED']*3600,
                'speed':re['HOURLY_GSM_SPEED']
            }
            arr.push(element)
           // console.log(element,'element')
        })
        const query='select production_unit_id, max(prod_end_date) start_date from approval group by production_unit_id';
        const params=[]
        var result =await this.sqlQuery(query,params)
        result.data.map(re=>{
            if(re.start_date!==null){
                //console.log(re,'re in line 77')
                arr.map((r,i)=>{
                    if(r.id===re.PRODUCTION_UNIT_ID) {
                        arr[i].start_time=Math.max(re.START_DATE,Date.now()/1000)
                       // console.log(re.START_DATE,",",data.gsm,",",r.speed,"in line 81")
                        arr[i].finish_time=arr[i].start_time+data.gsm/r.speed*3600
                        //console.log(arr[i],'in arr i index 83')
                    }
                })
            }

        })

        arr=arr.sort((a, b) => {
            return a.start_time-b.start_time
        });

        //console.log(arr)

        return (
            {
                'success': true,
                'data': arr
            }
        )
    }

    insetApproval=async(data)=>{
        const query='insert into approval(fabric_id,production_unit_id,approve_date,prod_start_date,prod_end_date,production_status,delivery_status) values (:0,:1,:2,:3,:4,:5,:6)'
        const params=[data.fabric_id,data.production_unit_id,data.approve_date,data.start_date,data.end_date,"on","false"]
        const result=await this.sqlQuery(query,params)
       // console.log(result,'in insert approval  in admin repository cls')
        /*const query1 ='select prod_end_date from approval where prod_end_date>:0 and'
        const params1=[Date.now()/1000]
        const result1=await this.sqlQuery(query1,params1)
        console.log(result1,'hi')*/
        const self=this
        if(data.end_date-Date.now()/1000<=120)
        setTimeout(async function(){ console.log('here')
            const query1 ='update  approval set delivery_status=:0 where prod_end_date=:1'
            const params1=["true",data.end_date]
            const result1=await self.sqlQuery(query1,params1)
            console.log(result1,'insertr after11111 ')},parseInt(data.end_date-Date.now()/1000)*1000)
        return result
    }

    getApprovals=async(data)=>{
        const query='select * from approval where production_unit_id=:0'
        const params=[data.id]
        var result=await this.sqlQuery(query,params)
       // console.log(result,'in get approvals in admin repo')
        return result
    }

    getSales=async(data)=>{
        const query='select dates,sum(nvl(debit,0)) as debit  from transaction group by dates order by dates desc'
        const params=[]
        var result=await this.sqlQuery(query,params)
        console.log(result,'in get sales in admin repo')
        return result
    }

}

module.exports= AdminRepository









