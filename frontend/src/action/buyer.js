import {setLoading, showToast} from "../App";
import axios from "axios";
import {setPage} from "../Route";

export const getCatalogs=async (type)=>{
    setLoading(true)
    try{
        var response=await axios.post('http://localhost:8088/datatex/buyer/catalogs', {
            weave_design:type
        })
        setLoading(false)
        return response.data
    }catch (e) {
        console.log(e)
        setLoading(false)
        return false
    }

}

export const orderFabricInserted=async (data)=>{
    setLoading(true)
    try{
        console.log('before data in order')
        var response=await axios.post('http://localhost:8088/datatex/buyer/order', {
            color_id:data.color_id,
            cotton_pct:data.cotton_pct,
            polyester_pct:data.polyester_pct,
            rayon_pct:data.rayon_pct,
            tencil_pct:data.tencil_pct,
            viscose_pct:data.viscose_pct,
            lycra_pct:data.lycra_pct,
            gsm_weight:data.gsm_weight,
            order_date:data.order_date,
            buyer_name:data.buyer_name,
            buyer_address:data.buyer_address,
            affliation:data.affliation
        })
        console.log(response.data)
        setLoading(false)
        showToast('order given successfully')
        return true

    }catch (e) {
        console.log(e)
        setLoading(false)
        return false
    }

}