const Repository=require('./connection')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const tokenExpiryDuration=86400

class AuthRepository extends Repository{
    constructor() {
        super();
    }

    signup=async data=>{

        /// check for unique email
        const query1='select * from users where email = :0'
        const params1=[data.email]
        const result1=await this.sqlQuery(query1,params1)
        console.log(result1,'in sign in in auth repository')
        if(result1.data.length>0){
            return{
                success:false,
                error:process.env.ERROR_EMAIL_EXISTS
            }
        }

        if(data.type===3){
            const query='insert into users (name,phone,email,address,username,type,password) values (:0,:1,:2,:3,:4,:5,:6)'
            const params=[data.name,data.phone,data.email,data.address,data.username,data.type,bcrypt.hashSync(data.password, 10)]
            const result=await this.sqlQuery(query,params)
            console.log(result,'in sign up in auth repository cls')
            return result
        }

        //check for employee id

        const query2='select * from employees where id = :0'
        const params2=[data.employee_id]
        const result2=await this.sqlQuery(query2,params2)
        console.log(result2,'in sign in in auth repository')
        if(result2.data.length==0){
            return{
                success:false,
                error:process.env.ERROR_NOT_FOUND_EMPLOYEE_ID
            }
        }

        const query='insert into users (name,phone,email,address,username,type,password,employee_id) values (:0,:1,:2,:3,:4,:5,:6,:7)'
        const params=[data.name,data.phone,data.email,data.address,data.username,2,bcrypt.hashSync(data.password, 10),data.employee_id]
        const result=await this.sqlQuery(query,params)
        console.log(result,'in sign up in auth repository cls')
        return result
    }

    signin=async data=>{
        const query='select * from users where email = :0'
        const params=[data.email]
        const result=await this.sqlQuery(query,params)
        console.log(result,'in sign in in auth repository')
        if(result.data.length===0){
            return{
                success:false,
                error:process.env.ERROR_NO_USER
            }
        }
        const pass=result.data[0]['PASSWORD']
        console.log(result.data[0])
        console.log('password in :',data.password,pass)
        //compare password
        if(bcrypt.compareSync(data.password, pass)) {
            var token = jwt.sign({
                id: result.data[0]['ID'],
                email: data.email,
                password: pass,
                type:result.data[0]['TYPE']
            }, process.env.JWT_SECRET_KEY, {expiresIn: `${tokenExpiryDuration}s`})
            return {
                success: true,
                user_id:result.data[0]['ID'],
                user_name:result.data[0]['USERNAME'],
                user_type:result.data[0]['TYPE'],
            }
        }
        return {
            success:false,
            error:process.env.ERROR_PASSWORD_MISMATCH
        }

    }

    resetPassword=async data=>{
        const query='select * from users where email = :0'
        const params=[data.email]
        //first check whether this email exists
        const result=await this.sqlQuery(query,params)
        if(result.data.length==0)
            return {
                success:false,
                error:"no user found"
            }
        const updatePassQuery='update users set password=:1 where email=:0'
        let newPass=bcrypt.hashSync(data.password, 10)
        const updateParams = [newPass,data.email]
        var updateResult = await this.sqlQuery(updatePassQuery, updateParams)
        if(updateResult.success){
            var token = jwt.sign({
                id: result.data[0]['ID'],
                email: data.email,
                password: newPass,
                type:result.data[0]['TYPE']
            }, process.env.JWT_SECRET_KEY, {expiresIn: `${tokenExpiryDuration}s`})
            return {
                success: true,
                token: token
            }
        }
        return updateResult
    }

    tokenValidity=async (id,email,password)=>{
        const query='select * from users where id = :0 and email = :1 and password = :2'
        const params=[id,email,password]
        var result=await this.sqlQuery(query,params)
        return result.data.length!==0
    }

    getAllEmployees=async ()=>{
        const query='select * from employees order by ID'
        const params=[]
        var result=await this.sqlQuery(query,params)
        return result
    }

    delete=async data=>{

        const query='delete from employees where id = :0'
        const params=[data.id]
        var result=await this.sqlQuery(query,params)
        console.log(result,'in delete in auth repo')
        return result
    }

    addStaff=async data=>{
        const query='insert into employees (name,phone,address,hire_date,salary) values (:0,:1,:2,:3,:4) returning id into staff_id'
        const params=[data.name,data.phone,data.address,data.hire_date,data.salary]
        const result=await this.sqlQuery(query,params)
        console.log(result,'in add staff in auth repository cls')
        return result
    }

    update=async data=>{
        const query='update employees set name=:0,phone=:1,address=:2,hire_date=:3,salary=:4 where id=:5'
        const params=[data.name,data.phone,data.address,data.hire_date,data.salary,data.id]
        const result=await this.sqlQuery(query,params)
        console.log(result,'in add staff in auth repository cls')
        return result
    }
}
module.exports=AuthRepository