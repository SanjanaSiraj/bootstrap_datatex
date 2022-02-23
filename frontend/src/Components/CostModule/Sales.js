
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
    ).replace(/ /g,'-');
}

function Sales(props){
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
    useEffect(async ()=>{
        const today = new Date()
        setLoading(true)
         var result=await getSales();
         setArray(result.result)
        console.log(result.result)
        setLoading(false)
        for(var i=0;i<30;i++){
            const priorDate = new Date().setDate(today.getDate() - i)
            labels[i]=formatDate(priorDate)

        }
        const new_data={
            labels:result.result.map((d)=>d.DATES),
            datasets: [
                {
                    label: 'Debit',
                    data: result.result.map((d)=>d.DEBIT),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }/*,
                {
                    label: 'Credit',
                    data: result.result.map((d)=>d.CREDIT),
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },*/
            ],
        }
        console.log(labels)
        setData(new_data)
    },[])
    return (
        <div style={{padding:'20px'}}>
            <Line options={options} data={data} />
        </div>
    );
}

export default Sales;

