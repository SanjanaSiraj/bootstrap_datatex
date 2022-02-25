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
import {setLoading, showToast} from "../../App";
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

    var today = new Date();
    var priorDate = new Date(new Date().setDate(today.getDate() - 30));

    console.log(today)
    console.log(priorDate);

    const [array,setArray]=new useState(null)
    const [array2,setArray2]=new useState(null)
    const [l1,setl1]=new useState(priorDate.getTime())
    const [l2,setl2]=new useState(today.getTime())
    useEffect(async ()=>{
        const today = new Date()
        setLoading(true)
         var result=await getSales();
         setArray(result.result)
        console.log(result.result)
        setLoading(false)
        console.log(l1,'date')
        console.log(l2,'date')
        var total1=0
        var total2=0
        var arr=[]
        result.result.map((d)=>{
            console.log(d,'in d')

            var dateParts = d.ID.split("/");

// month is 0-based, that's why we need dataParts[1] - 1
            var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
            console.log(dateObject.toLocaleString())
            if(dateObject.getTime()>=l1 && dateObject.getTime()<=l2){
                arr.push(d)
                total1=total1+d.DEBIT
                total2=total2+d.CREDIT
            }
        })

        setProfit(total2)
        setloss(total1)

        console.log(arr)

      /*  for(var i=0;i<30;i++){
            const priorDate = new Date().setDate(today.getDate() - i)
            labels[i]=formatDate(priorDate)

        }*/
        const new_data={
            labels:arr.map((d)=>d.ID),
            datasets: [
                {
                    label: 'Debit',
                    data: arr.map((d)=>d.DEBIT),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Credit',
                    data: arr.map((d)=>d.CREDIT),
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        }
        console.log(labels)
        setData(new_data)
    },[])



    const handleDate=newVal=>{
        setDate(newVal)
        setl1(new Date(newVal).getTime())
        console.log(new Date(newVal).getTime()/1000)

    }

    const handleDate2=newVal=>{
        setDate2(newVal)
        setl2(new Date(newVal).getTime())
        console.log(new Date(newVal).getTime()/1000)

    }

    function showGraph() {
        var total1=0
        var total2=0
        var arr=[]

        if(l1>l2|| l2>Date.now()||l1< new Date(new Date().setDate(today.getDate() - 50)).getTime()){
            showToast('check upper and lower bound')
        }
        else{
            array.map((d)=>{
                console.log(d,'in d')

                var dateParts = d.ID.split("/");

// month is 0-based, that's why we need dataParts[1] - 1
                var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                console.log(dateObject.toLocaleString())
                if(dateObject.getTime()>=l1 && dateObject.getTime()<=l2){
                    arr.push(d)
                    total1=total1+d.DEBIT
                    total2=total2+d.CREDIT
                }
            })

            setProfit(total2)
            setloss(total1)
            console.log(arr)

            /*  for(var i=0;i<30;i++){
                  const priorDate = new Date().setDate(today.getDate() - i)
                  labels[i]=formatDate(priorDate)

              }*/
            const new_data={
                labels:arr.map((d)=>d.ID),
                datasets: [
                    {
                        label: 'Debit',
                        data: arr.map((d)=>d.DEBIT),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: 'Credit',
                        data: arr.map((d)=>d.CREDIT),
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            }
            console.log(labels)
            setData(new_data)
        }

    }

    return (

        <div style={{padding:'20px',height:'calc(100vh - 97px)',overflowY:"scroll"}}>
            <div style={{display:"flex"}}>

                <Typography variant="h5" style={{marginRight:'20px'}}>
                    You can choose range maximum 30 days
                </Typography>
                <span style={{marginRight:"auto"}}>
                Profit:{profit}
                </span>
                <span style={{marginRight:"auto"}}>
                Loss:{loss}
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
                        onChange={handleDate2}
                        label="Date"
                        inputFormat="dd/MM/yyyy"
                        renderInput={(params) => <TextField {...params} variant={"standard"}/>}
                    />
                </LocalizationProvider>
            </div>
            <Button onClick={showGraph} variant="outlined" style={{marginTop:'20px'}}>Show</Button>
            <Line options={options} data={data} />
        </div>
    );
}

export default Sales;

