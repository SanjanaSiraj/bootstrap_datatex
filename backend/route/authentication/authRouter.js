const router = require('express').Router()
const AuthController=require('../../controller/authController')
const adminMiddleWare=require('../../services/adminValidation')

const authController=new AuthController()
//any user can sign up here(admin,staff,buyer)
router.post('/signup',authController.signup)
//any user can sign in here(admin,staff,buyer)
router.post('/signin',authController.signin)
//any user can reset password  here(admin,staff,buyer)
router.post('/resetPass',authController.resetPassword)

//these part only for admins
router.get('/getStaffs',authController.getEmployees)//admin can see all staffs
router.post('/addStaff',authController.addStaff)//admin can see all staffs
router.post('/updateStaff',authController.updateStaff)
router.post('/profile',authController.getProfile)
router.post('/uploadPic',authController.updatePicture)
router.post('/updateProfile',authController.updateProfile)
router.delete('/delete',authController.delete)//admin can delete any staff
module.exports=router