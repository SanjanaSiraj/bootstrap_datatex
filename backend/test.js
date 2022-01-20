require('dotenv').config()
const Repository=require('./repository/connection')
const repository=new Repository()

repository.sqlQuery('select * from users',[]).then((res)=>{
    console.log(res)
})
