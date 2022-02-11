import axios from "axios";
import {setLoading, showToast} from "../App";
import {passData, setPage} from "../Route";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const COOKIE_AGE=315360000

export const checkAuth=()=>{
    console.log(cookies.get('username'))
    if(cookies.get('username')===undefined || cookies.get('username')==null)
        return false
    else
        return true
}

export const logout=()=>{
    cookies.remove('username',{ path: '/' })
    cookies.remove('type',{ path: '/' })
    cookies.remove('user_id',{ path: '/' })
    console.log('in line 19 in logout')
}

export const getUserType=()=>{
    return cookies.get('type')
}

export const getUserName=()=>{
    return cookies.get('username')
}

export const getUserId=()=>{
    return cookies.get('user_id')
}

export const login=async (email, password,propes)=>{
    setLoading(true)
     axios.post('http://localhost:8088/datatex/auth/signin', {
        email: email,
        password: password
    }).then(res=>{
        console.log(res.data)
         passData(res.data)
         cookies.set('username',res.data.username,{ path: '/', maxAge: COOKIE_AGE })
         cookies.set('type',res.data.type,{ path: '/', maxAge: COOKIE_AGE })
         cookies.set('user_id',res.data.user_id,{ path: '/', maxAge: COOKIE_AGE })
         //checkAuth(dispatcher)
         if(res.data.type===3)
             setPage(7)
         else setPage(6)

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