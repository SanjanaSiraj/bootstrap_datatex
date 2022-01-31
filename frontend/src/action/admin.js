import axios from "axios";
import {setLoading, showToast} from "../App";

export const addCatalog=async (imageUrl,color,price,weave,propes)=>{
    setLoading(true)
    axios.post('http://localhost:8088/datatex/admin/createCatalog', {
        color: color,
        price_per_gsm: price,
        weave_design:weave,
        image:imageUrl
    }).then(res=>{
        console.log(res.data)
        propes.nav(6)
    }).catch(err=>{
       console.log(err)

    }).finally(()=>{
        setLoading(false)
    })

}

export const fetchEmployees=async ()=>{
    console.log('before fetch employees')
    const responseData=await axios.get('http://localhost:8088/datatex/auth/getStaffs')
    console.log('after fetching employees')
    console.log(responseData)
    return responseData
}

export const insertNewEmployee=async (data2)=>{
    setLoading(true)

    try{
        var result=axios.post('http://localhost:8088/datatex/auth/addStaff', {
            name:data2.name,
            phone:data2.phone,
            address:data2.address,
            hire_date:data2.hire_date,
            salary:data2.salary
        })

        console.log(result)
        setLoading(false)
        return  true
    }catch (e) {
        console.log(e)
        setLoading(false)
        return false
    }
}

export const updateAEmployee=async (data2)=>{
    setLoading(true)

    try{
        var result=axios.post('http://localhost:8088/datatex/auth/updateStaff', {
            name:data2.name,
            phone:data2.phone,
            address:data2.address,
            hire_date:data2.hire_date,
            salary:data2.salary,
            id:data2.id
        })

        console.log(result)
        setLoading(false)
        return  true
    }catch (e) {
        console.log(e)
        setLoading(false)
        return false
    }
}

export const deletedStaff=async(data)=>{
    setLoading(true)
    try{
        var result=await axios.delete('http://localhost:8088/datatex/auth/delete', {
            data:{

                id: data
            }
        })
        console.log(result.data)
        setLoading(false)
        return  true
    }catch(e){
        console.log(e)
        setLoading(false)
        return false
    }

}

export const getOrders=async()=>{
    console.log('before fetch orders')
    const responseData=await axios.get('http://localhost:8088/datatex/admin/getFabric')
    console.log('after fetching fabric')
    console.log(responseData.data)
    return responseData.data
}

