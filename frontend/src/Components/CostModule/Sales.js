import React, {useState, useEffect, Component} from "react";
import { Line } from "react-chartjs-2";


class Sales extends Component {
    /*constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [
                    "Monday",
                    "Tuesday"
                ],
                datasets: [
                    {
                        label: "Overall Cost",
                        data: [12000, 62000],
                    }
                ]
            }
        };
    }*/

    render() {
        return (
            <div className="chart">
                {/*<Line
                    data={this.state.chartData}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        legend: {
                            display: false
                        }
                    }}
                />*/}
            </div>
        );
    }
}

export default Sales;

