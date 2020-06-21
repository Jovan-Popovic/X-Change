import React, { useState, Component } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { TableAdmin } from './table-admin.js'

import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:{
        labels: ['New', 'Sell'],
      datasets:[
        {
          label:'balance',
          data:[
            500, 100
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)'
          ]
        }
      ]
      }
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
  }

  render(props){
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Web Balance',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </div>
    )
  }
}


export const Dashboard = () => {

{/* for calendar */}
  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
  }

  return (
    <div>
      <div className="admin-calendar">
      <Calendar onChange={onChange} value={date} />
      <Chart />
      </div>
      <div>
        <p>Number of Users:</p>
        <p>Number of Admins:</p>
        <p>Number of Products</p>
      </div>
      <TableAdmin />
    </div>
  );
};