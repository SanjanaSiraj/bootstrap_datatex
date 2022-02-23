import React, {useEffect, useRef, useState} from "react";
import {Table} from "react-bootstrap";
import {
    Box,
    LinearProgress,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {deletedStaff, fetchEmployees, insertNewEmployee, updateAEmployee} from "../../action/admin";
import '../employee/Employee.css'

function EmployeeForStaff(props){

    const [array,setArray]=useState(null)
    console.log('in')
    useEffect(async ()=>{
        console.log('in before fetchemployee')
        var arr=await fetchEmployees()
        console.log('hiiiiiiiiii')
        console.log(arr)
        setArray(arr.data)

    },[])

    return(
        <div style={{padding:'30px',height:'100%',overflowY:'scroll'}}>
            <Box style={{height:'100%'}}>
                <h2 className="heading" style={{}}>Employees List</h2>

                <br></br>

                <TableContainer >
                    <Table stickyHeader aria-label="sticky table" striped={'true'} variant={'light'} hover={'true'}>
                        <TableHead>
                            <TableRow>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>ADDRESS</th>
                                <th>PHONE</th>
                                <th>HIRE_DATE</th>
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
                                                <td> {new Date(employee.HIRE_DATE*1000).toLocaleString()}</td>

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
            </Box>
        </div>
    )
}
export default EmployeeForStaff