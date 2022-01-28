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