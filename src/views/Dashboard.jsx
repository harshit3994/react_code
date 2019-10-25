import React, { Component } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart
} from "recharts";

import { ComposedChart, Area, Bar } from "recharts";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";

// const data = [
//   {
//     name: "Page A",
//     Temperature: 4000,
//     Humidity: 2400,
//     amt: 2400
//   },
//   {
//     name: "Page B",
//     Temperature: 3000,
//     Humidity: 1398,
//     amt: 2210
//   },
//   {
//     name: "Page C",
//     Temperature: 2000,
//     Humidity: 9800,
//     amt: 2290
//   },
//   {
//     name: "Page D",
//     Temperature: 2780,
//     Humidity: 3908,
//     amt: 2000
//   },
//   {
//     name: "Page E",
//     Temperature: 1890,
//     Humidity: 4800,
//     amt: 2181
//   },
//   {
//     name: "Page F",
//     Temperature: 2390,
//     Humidity: 3800,
//     amt: 2500
//   },
//   {
//     name: "Page G",
//     Temperature: 3490,
//     Humidity: 4300,
//     amt: 2100
//   }
// ];

class Dashboard extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      showComponent1: true,
      showComponent2: false,
      resultJson: [],
      resultJson1: [],
      sum : 0,
      sumHumid: 0
    };
    this._onButtonClick1 = this._onButtonClick1.bind(this);
    this._onButtonClick2 = this._onButtonClick2.bind(this);
  }

  componentDidMount() {
   
  if(this.props.history.location.state)
  {
    this.getTempData("05");
    this.getHumidity("06");
  }else{
    this.getTempData("01");
    this.getHumidity("02");
  }
   
  }

  _onButtonClick1() {
    console.log("abcd");
    this.setState({
      showComponent1: true,
      showComponent2: false
    });
    this.getTempData();
  }

  _onButtonClick2() {
    console.log("ab");
    this.setState({
      showComponent2: true,
      showComponent1: false
    });
    this.getHumidity();
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  getTempData = (device_id) => {
    //return new Promise((resolve, reject) => {
    var date = new Date();
    const questions = [];
    let device_idmod = '';
    let sum =0,l=0;
    //console.log(this.props.location.state);
    //console.log(this.props.history.location.state.device_id);
    // DOING GET API REQUEST TO FETCH THE TEMP  STATISTICS

    if(device_id === "01" || device_id ==="02")
    {
      device_idmod = device_id
    }else{
      device_idmod = this.props.history.location.state.device_id;
    }
    try{
    fetch(
      `http://cm1.sensegiz.com/sensegiz-api/temperature/546C0E9FCC79/${device_idmod}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          uid: "8",
          "Api-Key": "175748dfd70bc49b190aacf3a5ce0d86"
        }
      }
    )
      .then(res => res.json())
      .then(resultJson => {
      
        resultJson.records.forEach(item => {
        
          sum =sum + Math.round(item.device_value);
          questions.push({
            name: item.received_on,
            Temperature: item.device_value
          });
          l++;
        
        });
sum = Math.round(sum/l)-1;
        this.setState({ resultJson: questions });
        this.setState({sum : sum})
      });
    } catch(e)
    {
      // do nothing
    }
  };
  getHumidity = (device_id) => {
    // return new Promise((resolve, reject) => {
    var date = new Date();
    let device_idmod = '';
    const questions = [];
    let sum = 0,l=0;

    if(device_id === "01" || device_id ==="02")
    {
      device_idmod = device_id
    }else{
      device_idmod = this.props.history.location.state.device_id;
    }

    // DOING GET API REQUEST TO FETCH THE TEMP  STATISTICS
    fetch(
      `http://cm1.sensegiz.com/sensegiz-api/humiditystream/546C0E9FCC79/${device_idmod}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          uid: "8",
          "Api-Key": "175748dfd70bc49b190aacf3a5ce0d86"
        }
      }
    )
      .then(res => res.json())
      .then(resultJson => {
        console.log(JSON.stringify(resultJson))
        resultJson.records.forEach(item => {
          
          sum = sum + Math.round(item.device_value);
          questions.push({
            name: item.received_on,
            Humidity: item.device_value
          });
          console.log(sum +" -"+ l)
          l++;
        });
        sum = Math.round(sum/l);
        this.setState({ sumHumid: sum });
        this.setState({ resultJson1: questions });
      });
  };

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={6} sm={6}>
              <div onClick={this._onButtonClick1}>
                <StatsCard
              
                  bigIcon={<i className="fa fa-thermometer text-warning" />}
                  statsText="Temperature"
                  statsValue={this.state.sum}
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Updated now"
                  temp = "true"
                />
              </div>
            </Col>
            <Col lg={6} sm={6}>
              <div onClick={this._onButtonClick2}>
                <StatsCard
                  bigIcon={<i className="pe-7s-wallet text-success" />}
                  statsText="Humidity"
                  statsValue={this.state.sumHumid}
                  statsIcon={<i className="fa fa-calendar-o" />}
                  statsIconText="Updated Now"
                  temp = "false"
                />
              </div>
            </Col>
          </Row>
          <Row>
            {this.state.showComponent1
              ? <Col md={12} sm={6}>
                  <Card
                    id="chartHours"
                    title="Temprature Statistics"
                   
                    // stats="Updated 3 minutes ago"
                    content={
                      <div className="ct-chart">
                      
                        <LineChart
                          width={900}
                          height={300}
                          data={this.state.resultJson}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="Temperature"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                          />
                         
                        </LineChart>
                      </div>
                    }
                  />
                </Col>
              : <Col md={12} sm={6}>
                  <Card
                    title="Humidity Statistics"
                  
                    content={
                      <div
                        id="chartPreferences"
                        className="ct-chart ct-perfect-fourth"
                      >
             <LineChart
                          width={900}
                          height={300}
                          data={this.state.resultJson1}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="Humidity"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                          />
                         
                        </LineChart>
                      </div>
                    }
                  />
                </Col>}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
