import React, {useEffect, useRef, useState} from "react";
import {Table} from "react-bootstrap";
import {
    Box,
    Button,
    Container,
    Dialog, DialogActions, DialogContent,
    DialogTitle, Grid,
    LinearProgress,
    Paper,
    TableBody,
    TableContainer,
    TableHead,
    TableRow, TextField, Typography
} from "@mui/material";
import {deletedStaff, fetchEmployees, insertNewEmployee, updateAEmployee} from "../../action/admin";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {invertColor} from "../../util";
import {showToast} from "../../App";
import {orderFabricInserted} from "../../action/buyer";

function Emplyee(props){

    const [orderDialog,setOrderDialog]=useState(false)
    const [operation,setOperation]=useState(0)
    const [selectedStaff,setSelectedStaff]=useState(null)
    const [date,setDate]=useState(Date.now())
    const nameRef=useRef()
    const phoneRef=useRef()
    const addressRef=useRef()
    const salaryRef=useRef()
    const onClickedBack=()=>{
        setOrderDialog(false)
    }

    const [array,setArray]=useState(null)
    console.log('in')
    useEffect(async ()=>{
        console.log('in before fetchemployee')
        var arr=await fetchEmployees()
        console.log('hiiiiiiiiii')
        console.log(arr)
        setArray(arr.data)

    },[])

    function addEmployee() {
        console.log('want to try open dialogue')
        setOrderDialog(true)
        setOperation(0 )
    }

    async function insertEmployee() {

        if (parseInt(salaryRef.current.value) < 0) {
            showToast('salary can not be negative')
        } else if (nameRef.current.value.length === 0 || new Date(date).getTime() / 1000 === 0 || addressRef.current.value.length === 0 || phoneRef.current.value.length === 0) {
            showToast('You have to fill all required fields')
        } else {

            const data = {
                name: nameRef.current.value,
                phone: phoneRef.current.value,
                address: addressRef.current.value,
                hire_date: new Date(date).getTime()/1000,
                salary: parseInt(salaryRef.current.value)
            }
            console.log(data, 'in insert employee')
            var isInserted = await insertNewEmployee(data)
            if (isInserted) {
                /*setArray([{
                    NAME:data.name,
                    ADDRESS:data.address,
                    PHONE:data.phone,
                    ID:data.id,
                    SALARY:data.salary,
                    HIRE_DATE:data.hire_date
                },...array])
*/
                setOrderDialog(false)
                console.log('yes we inserted')
                showToast('Employee added successfully')
            }
            else if(!isInserted){
                showToast('Employee added is not successful.Please try again')
            }

        }
    }

    const handleDate=newVal=>{
        setDate(newVal)
        console.log(new Date(newVal).getTime()/1000)

    }



    async function updateStaff() {
        const data = {
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            address: addressRef.current.value,
            hire_date: new Date(date).getTime()/1000,
            salary: parseInt(salaryRef.current.value),
            id:selectedStaff.ID
        }

        var isUpdates = await updateAEmployee(data)
        if (isUpdates) {
            var temp=[...array]
            temp.map((t,i)=>{
                if(t.ID===selectedStaff.ID){
                    temp[i]= {
                        NAME:data.name,
                        ADDRESS:data.address,
                        PHONE:data.phone,
                        ID:data.id,
                        SALARY:data.salary,
                        HIRE_DATE:data.hire_date
                    }
                }
            })
            setArray([...temp])
            setOrderDialog(false)
            console.log('yes we updates')
            showToast('Employee updated successfully')
        }
        else if(!isUpdates){
            showToast('Employee updating is not successful.Please try again')
        }

    }

    async function deleteStaffCall(id) {
        /*console.log(isDeleted,'before calling delete')*/
        let isDeleted=await deletedStaff(id)
        console.log(isDeleted,'after calling delete')
        if (isDeleted) {
            setOrderDialog(false)
            console.log('yes we inserted')
            showToast('Employee deleted successfully')
        }
        else {
            showToast('Employee deletion is not successful.Please try again')
        }
    }

    const chooseOperation=()=>{
        if(operation===0){
            insertEmployee()
        }else{
            updateStaff()
        }
    }

    const updatePromptCLick=(e)=>{
        setDate(new Date(e.HIRE_DATE))
        setSelectedStaff(e)
        setOperation(1)
        setOrderDialog(true)

    }

    return(
        <div style={{padding:'20px',height:'100%'}}>
            <Dialog open={orderDialog}>
                <DialogTitle>
                    <Typography variant={"h6"} >
                        Create New Employee
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={1} style={{marginTop:'7px'}}>

                        <Grid item xs={6}>
                            <TextField variant={"standard"} label={"Name"} fullWidth inputRef={nameRef} defaultValue={operation===1&&selectedStaff!==null?selectedStaff.NAME:""}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant={"standard"} label={"Address"} fullWidth inputRef={addressRef} defaultValue={operation===1&&selectedStaff!==null?selectedStaff.ADDRESS:""}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant={"standard"} label={"Phone"} fullWidth inputRef={phoneRef}  defaultValue={operation===1&&selectedStaff!==null?selectedStaff.PHONE:""}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant={"standard"} label={"Salary"} fullWidth type={"number"} inputRef={salaryRef} defaultValue={operation===1&&selectedStaff!==null?selectedStaff.SALARY:""}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        value={date}
                                        onChange={handleDate}
                                        label="Date"
                                        inputFormat="MM/dd/yyyy"
                                        renderInput={(params) => <TextField {...params} variant={"standard"}/>}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button color={"secondary"} onClick={onClickedBack}>
                        Cancel
                    </Button>
                    <Button color={"primary"} onClick={chooseOperation} >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <Box style={{height:'100%'}}>
                <h2 className="heading" style={{}}>Employees List</h2>
                <div className = "add">
                    <Button variant={"contained"} onClick={addEmployee}> Add Employee</Button>
                </div>
                <br></br>
                <Paper sx={{ width: '100%', overflow: 'hidden' ,Height:'100%',zIndex:'100000'}}>
                    <TableContainer sx={{ Height: '100%', }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>ADDRESS</th>
                                    <th>PHONE</th>
                                    <th>HIRE_DATE</th>
                                    <th>SALARY</th>
                                    <th> Actions</th>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    array!==null?(
                                        array.map(employee=>{
                                            return(
                                                <tr key = {employee.ID}>
                                                    <td> {employee.ID}</td>
                                                    <td> {employee.NAME}</td>
                                                    <td>{employee.ADDRESS}</td>
                                                    <td> {employee.PHONE}</td>
                                                    <td> {new Date(employee.HIRE_DATE).toLocaleString()}</td>
                                                    <td> {employee.SALARY}</td>
                                                    <td>
                                                        <Button  variant={"outlined"} onClick={()=>{
                                                            //updateStaff(employee.ID,employee.NAME,employee.ADDRESS,employee.PHONE,employee.HIRE_DATE,employee.SALARY)
                                                            updatePromptCLick(employee)
                                                        }}>Update </Button>
                                                        <Button style={{marginLeft: "10px"}}  color={'error'} variant={"contained"} onClick={()=>{
                                                            deleteStaffCall(employee.ID)
                                                        }}>Delete </Button>

                                                    </td>
                                                </tr>
                                            )

                                        })
                                    ):(
                                        <LinearProgress/>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </div>
    )
}
export default Emplyee