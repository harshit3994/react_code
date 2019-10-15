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
      resultJson1: []
    };
    this._onButtonClick1 = this._onButtonClick1.bind(this);
    this._onButtonClick2 = this._onButtonClick2.bind(this);
  }

  componentDidMount() {
    this.getTempData();
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
  getTempData = () => {
    //return new Promise((resolve, reject) => {
    var date = new Date();
    const questions = [];
   // console.log(this.props.location.state.device_id);
    // DOING GET API REQUEST TO FETCH THE TEMP  STATISTICS
    fetch(
      `http://cm1.sensegiz.com/sensegiz-api/temperature/546C0E9FCC79/14`,
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
          console.log("##3");
          questions.push({
            name: item.received_on,
            Temperature: item.device_value
          });
        });

        this.setState({ resultJson: questions });
      });
  };
  getHumidity = () => {
    // return new Promise((resolve, reject) => {
    var date = new Date();

    const questions = [];

    // DOING GET API REQUEST TO FETCH THE TEMP  STATISTICS
    fetch(
      `http://cm1.sensegiz.com/sensegiz-api/humidity/546C0E9FCC79/14`,
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
          questions.push({
            name: item.received_on,
            Humidity: item.device_value
          });
        });
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
                  statsText="Temprature"
                  statsValue="24 °C"
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Updated now"
                />
              </div>
            </Col>
            <Col lg={6} sm={6}>
              <div onClick={this._onButtonClick2}>
                <StatsCard
                  bigIcon={<i className="pe-7s-wallet text-success" />}
                  statsText="AC"
                  statsValue="$1,345"
                  statsIcon={<i className="fa fa-calendar-o" />}
                  statsIconText="Last day"
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
                    title="Email Statistics"
                    category="Last Campaign Performance"
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
