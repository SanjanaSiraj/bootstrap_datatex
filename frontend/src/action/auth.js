import axios from "axios";
import {setLoading, showToast} from "../App";
import {passData} from "../Route";

export const login=async (email, password,propes)=>{
    setLoading(true)
     axios.post('http://localhost:8088/datatex/auth/signin', {
        email: email,
        password: password
    }).then(res=>{
        console.log(res.data)
         passData(res.data)
         propes.nav(6)

    }).catch(err=>{
        if(err.response.status===401){
            showToast('password incorrect')
        }
         else if(err.response.status===404){
             showToast('email is not found')
         }

    }).finally(()=>{
        setLoading(false)
    })

}
export const signup=async(name,employee_id,username,email,password,phone,address,propes)=>{
    setLoading(true)
    axios.post('http://localhost:8088/datatex/auth/signup',{
        email: email,
        password: password,
        name:name,
        address:address,
        phone:phone,
        username:username,
        employee_id:employee_id
    }).then(res=>{
        console.log(res)
        if(res.status===404){
            showToast('This email is already in use')
            console.log('statue 404 in then')
        }
        else if(res.status===204){
            showToast('Employee id is incorrect')
            setLoading(false)
            console.log('statue 204 in then')
        }
        else{
            console.log(res.data)
            propes.nav(6)
        }

    }).catch(err=>{
        if(err.response.status===404){
            showToast('This email is already in use')
            console.log('statue 404 in catch')
        }
        else if(err.response.status===204){
            showToast('Employee id is incorrect')
            setLoading(false)
            console.log('statue 204 in catch')
        }

    }).finally(()=>{
        setLoading(false)
    })
}