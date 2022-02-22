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

export const getOwnOrders=async (id)=>{
    setLoading(true)
    try{
        var response=await axios.post('http://localhost:8088/datatex/buyer/fabrics', {
            user_id:id
        })
        setLoading(false)
        return response.data
    }catch (e) {
        console.log(e)
        setLoading(false)
        return false
    }

}

export const getACats=async (id)=>{
    setLoading(true)
    try{
        var response=await axios.post('http://localhost:8088/datatex/buyer/oneCat', {
            color_id:id
        })
        setLoading(false)
        console.log(response.data,'in get a cat')
        return response.data
    }catch (e) {
        console.log(e)
        setLoading(false)
        return false
    }

}

export const getAllOrdersAxios=async (id)=>{

    try{
        var response=await axios.post('http://localhost:8088/datatex/buyer/getAllOrders', {
            user_id:id
        })

        console.log(response.data,'in getAllOrdersAxios a cat')
        return response.data
    }catch (e) {
        console.log(e)

        return false
    }

}

export const get2OrdersAxios=async (id)=>{

    try{
        var response=await axios.post('http://localhost:8088/datatex/buyer/get2Orders', {
            user_id:id
        })

        console.log(response.data,'get2OrdersAxios')
        return response.data
    }catch (e) {
        console.log(e)

        return false
    }

}

export const get3OrdersAxios=async (id)=>{

    try{
        var response=await axios.post('http://localhost:8088/datatex/buyer/get3Orders', {
            user_id:id
        })

        console.log(response.data,'get3OrdersAxios=')
        return response.data
    }catch (e) {
        console.log(e)

        return false
    }

}
export const get4OrdersAxios=async (id)=>{

    try{
        var response=await axios.post('http://localhost:8088/datatex/buyer/get4Orders', {
            user_id:id
        })

        console.log(response.data,'get4OrdersAxios=')
        return response.data
    }catch (e) {
        console.log(e)

        return false
    }

}
export const get5OrdersAxios=async (id)=>{

    try{
        var response=await axios.post('http://localhost:8088/datatex/buyer/get5Orders', {
            user_id:id
        })

        console.log(response.data,'get5OrdersAxios=')
        return response.data
    }catch (e) {
        console.log(e)

        return false
    }

}

export const orderFabricInserted=async (data)=>{

    console.log(data,'in buyer line 23')
    try{
        console.log('before data in order',data)
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
            affliation:data.affliation,
            total_price:data.total_price,
            image:data.image,
            user_id:data.user_id
        })
        console.log(response.data)


        return true

    }catch (e) {
        console.log(e)
        setLoading(false)
        return false
    }

}

export const updateRemoveStatus=async (A,B,C)=>{
   console.log(A,B,C,'in buyer in 90')

    try{
        var result=axios.post('http://localhost:8088/datatex/buyer/removeCat', {
            fabric_id:B,
            remove_status:C,
            user_id:A
        })

        console.log(result)

        return  true
    }catch (e) {
        console.log(e)

        return false
    }
}