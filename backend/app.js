const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser=require('body-parser')
const authRouter=require('./route/authentication/authRouter')
const adminRouter=require('./route/adminRoute')
const buyerRouter=require('./route/buyerRoute')
const Pending=require( './services/PendingAlarm')
var cron = require('node-cron');
const pending =new Pending()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const apiBase="/datatex"
app.use(apiBase+'/auth',authRouter)
app.use(apiBase+'/admin',adminRouter)
app.use(apiBase+'/buyer',buyerRouter)
const port=process.env.PORT || 8088;

app.listen(port, () => {
    console.log(`App listening at port : ${port}`)
})
pending.test()

cron.schedule('*/2 * * * *', () => {
    console.log('every 2 min')
    pending.test()
});







