import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {getSales} from "../../action/admin";
import {setLoading} from "../../App";
import {Button, TextField, Typography} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
    scales: {
        y: {
            beginAtZero: true
        }

    }
};

const labels = [];

const formatDate=date=>{

    return new Date(date).toLocaleDateString(
        'en-GB',{
            day:'2-digit',
            month:'short',
            year:'numeric'
        }
    ).replace(/ /g,'/');
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate2(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}

function Sales(props){
    const [date,setDate]=useState(Date.now())
    const [date2,setDate2]=useState(Date.now())
    const[profit,setProfit]=useState(0)
    const[loss,setloss]=useState(0)
    const [data,setData]=useState({
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => 10),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => 10),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    })

    const [array,setArray]=new useState(null)
    const [array2,setArray2]=new useState(null)
    const [l1,setl1]=new useState(formatDate2(new(date)))
    const [l2,setl2]=new useState(formatDate2(date2))
    useEffect(async ()=>{
        const today = new Date()
        setLoading(true)
         var result=await getSales();
         setArray(result.result)
        console.log(result.result)
        setLoading(false)
        console.log(l1,'date')
        console.log(l2,'date')
       /* var total1=0
        var total2=0
        result.result.map((d)=>{
            if(d.ID>=l1 && d.ID<=l2){
                array2.push(d)
                total1=total1+d.DEBIT
                total2=total2+d.CREDIT
            }
        })*/

        for(var i=0;i<30;i++){
            const priorDate = new Date().setDate(today.getDate() - i)
            labels[i]=formatDate(priorDate)

        }
        const new_data={
            labels:result.result.map((d)=>d.ID),
            datasets: [
                {
                    label: 'Debit',
                    data: array2.map((d)=>d.DEBIT),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Credit',
                    data: array2.map((d)=>d.CREDIT),
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        }
        console.log(labels)
        setData(new_data)
    },[])

    const handleDate=newVal=>{
        setDate(newVal)
        console.log(new Date(newVal).getTime()/1000)

    }
    return (
        <div style={{padding:'20px'}}>
            <div style={{display:"flex"}}>

                <Typography variant="h5" style={{marginRight:'20px'}}>
                    You can choose range maximum 30 days
                </Typography>
                <span style={{marginRight:"auto"}}>
                Profit:
                </span>
                <span style={{marginRight:"auto"}}>
                Loss:
                </span>
            </div>

            <div>
                <Typography variant="h6" component="div" gutterBottom>
                    lower bound
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        value={date}
                        onChange={handleDate}
                        label="Date"
                        inputFormat="dd/MM/yyyy"
                        renderInput={(params) => <TextField {...params} variant={"standard"}/>}
                    />
                </LocalizationProvider>
            </div>
            <div style={{marginLeft:'auto'}}>
                <Typography variant="h6" component="div" gutterBottom>
                    upper bound
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        value={date2}
                        onChange={handleDate}
                        label="Date"
                        inputFormat="dd/MM/yyyy"
                        renderInput={(params) => <TextField {...params} variant={"standard"}/>}
                    />
                </LocalizationProvider>
            </div>
            <Button variant="outlined" style={{marginTop:'20px'}}>Show</Button>
            <Line options={options} data={data} />
        </div>
    );
}

export default Sales;

