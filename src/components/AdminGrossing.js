import React, { Component } from 'react';
import axios from 'axios'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


class AdminGrossing extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bills: new Array(),
            totalGrossing: 0,
            data: [],
        }
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value,
        })
    }

    componentDidMount() {
        //load bill
        this.reloadBill()
        //calculate grossing
        this.grossingCal(2021)
    }

    reloadBill() {
        axios.get('http://localhost:5000/bill/')
            .then(
                res => {
                    var bills = res.data
                    this.setState({
                        bills: bills
                    })
                })
    }

    grossingCal(selectYear) {
        console.log(selectYear);
        axios.get('http://localhost:5000/bill/')
            .then(
                res => {
                    var bills = res.data
                    //annually grossing
                    var totalGrossing = 0
                    bills.forEach(bill => {
                        if (new Date(bill.createdAt) >= new Date(selectYear + ", 01, 01") && new Date(bill.createdAt) <= new Date(selectYear + ", 12, 31")) {
                            totalGrossing += bill.total_price * 0.1
                        }
                    });
                    //season grossing
                    var grossing1 = 0
                    bills.forEach(bill => { //Date(bill.createdAt) >= Date("2021-01-01T00:00:00.000Z") && 
                        if (new Date(bill.createdAt) >= new Date(selectYear + ", 01, 01") && new Date(bill.createdAt) <= new Date(selectYear + ", 03, 31")) {
                            grossing1 += bill.total_price * 0.1
                        }
                        grossing1 = Math.round(grossing1)
                    });
                    //
                    var grossing2 = 0
                    bills.forEach(bill => { //Date(bill.createdAt) >= Date("2021-01-01T00:00:00.000Z") && 
                        if (new Date(bill.createdAt) >= new Date(selectYear + ", 04, 01") && new Date(bill.createdAt) <= new Date(selectYear + ", 06, 30")) {
                            grossing2 += bill.total_price * 0.1
                        }
                        grossing2 = Math.round(grossing2)
                    });
                    //
                    var grossing3 = 0
                    bills.forEach(bill => { //Date(bill.createdAt) >= Date("2021-01-01T00:00:00.000Z") && 
                        if (new Date(bill.createdAt) >= new Date(selectYear + ", 07, 01") && new Date(bill.createdAt) <= new Date(selectYear + ", 09, 30")) {
                            grossing3 += bill.total_price * 0.1
                        }
                        grossing3 = Math.round(grossing3)
                    });
                    //
                    var grossing4 = 0
                    bills.forEach(bill => { //Date(bill.createdAt) >= Date("2021-01-01T00:00:00.000Z") && 
                        if (new Date(bill.createdAt) >= new Date(selectYear + ", 10, 01") && new Date(bill.createdAt) <= new Date(selectYear + ", 12, 31")) {
                            grossing4 += bill.total_price * 0.1
                        }
                        grossing4 = Math.round(grossing4)
                    });
                    this.setState({
                        totalGrossing: totalGrossing,
                        data: [
                            { name: 'Quý 1', doanhthu: grossing1 },
                            { name: 'Quý 2', doanhthu: grossing2 },
                            { name: 'Quý 3', doanhthu: grossing3 },
                            { name: 'Quý 4', doanhthu: grossing4 }
                        ]
                    })
                })
    }


    render() {
        const { data } = this.state; //draw diagram 

        return (
            <div>
                <h1>Doanh Thu</h1>
                <p> <span>Chọn năm: </span>
                <select onChange={(e)=>{
                    this.grossingCal(e.target.value)
                }} >
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    </select>;
                </p>
                
                <p>Tổng Doanh Thu: <span style={{color:"#8884d8"}}>${Math.round(this.state.totalGrossing)}</span></p>
                <ResponsiveContainer className="chart" height={300}>
                    <LineChart
                        width={600}
                        height={300}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="doanhthu" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>


            </div>

        )
    }




}
export default AdminGrossing;